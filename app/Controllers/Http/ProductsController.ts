import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Account from "App/Models/Account";
import Category from "App/Models/Category";
import Product from "App/Models/Product";
import { v4 } from "uuid";
import {
  create_product_validator,
  filter_product_validator,
  get_product_from_ids_validator,
  get_product_validator,
  update_product_validator,
} from "App/Validators/ProductValidator";
import { allChildren } from "./Tools/CategoriesUtil";
import { paginate } from "./Tools/Utils";
import { createFiles } from "./Tools/FileManager/CreateFiles";
import { updateFiles } from "./Tools/FileManager/UpdateFiles";
import { deleteFiles } from "./Tools/FileManager/DeleteFiles";

export default class ProductsController {
  public async create_product({ request, auth }: HttpContextContract) {
  const v  = await   request.ValidateAndMerge(create_product_validator)
      
  const { title, description, price, category_id, caracteristique } =v;
  console.log({v});
      
    const category = await Category.find(category_id);
    if (!category) return "ERROR category.id=" + category_id + "not found";

    if (!category.is_parentable)
      return "ERROR this category can't be use like parent category, please choise another one";

    const id = v4();
    const account = await Account.getAccountByAuth(auth);

    const photosUrl = await createFiles({
      request,
      column_name: "photos",
      table_id: id,
      table_name: "products",
      options: {
        throwError: true,
        min: 1,
        max: 7,
        extname: ["jpg", "jpeg", "webp"],
        maxSize: 12 * 1024 * 1024,
      },
    });

    const product = await Product.create({
      id,
      title,
      description,
      price,
      caracteristique: caracteristique,
      status: Product.STATUS.AWAIT,
      account_id: account.id,
      category_id,
      photos: JSON.stringify(photosUrl),
      // express_time:'',
      // last_appearance:'',
      // moderator_id:''
    });

    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
      photos: photosUrl,
      id,
      lol: photosUrl.map((e, i) => [e, "photos_" + i]).flat(1),
    };
  }

  public async update_product({ request, auth }: HttpContextContract) {
    const body = await request.validate(update_product_validator);
    const attributes = [
      "title",
      "description",
      "price",
      "category_id",
      "caracteristique",
    ];
    const filesAttributes = ["photos"];

    const access = await auth.authenticate();

    const product = await Product.findByOrFail("id", body.product_id);

    if (!product) {
      return "ERROR Product not found";
    }
    if (product.account_id !== access.auth_table_id) {
      return "ERROR Permission denied";
    }

    attributes.forEach((attribute) => {
      if (body[attribute]) product[attribute] = body[attribute];
    });

    let urls: string[];
    const returnFiles = {};

    for (const filesAttribute of filesAttributes) {
      urls = await updateFiles({
        request,
        table_name: "products",
        table_id: product.id,
        column_name: "photos",
        lastUrls: product[filesAttribute],
        newPseudoUrls: body[filesAttribute],
        options: {
          throwError: true,
          min: 1,
          max: 7,
          extname: ["jpg", "jpeg", "webp"],
          maxSize: 12 * 1024 * 1024,
        },
      });

      product[filesAttribute] = JSON.stringify(urls);
      returnFiles[filesAttribute] = urls;
    }

    await product.save();
    const account = await Account.findOrFail(product.account_id);

    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
      photos: JSON.parse(product.photos),
    };
  }

  public async get_product({ request }: HttpContextContract) {
    const { product_id } = await request.validate(get_product_validator);
    const product = await Product.findByOrFail("id", product_id);
    const account = await Account.findOrFail(product.account_id);

    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
      photos: JSON.parse(product.photos),
    };
  }

  public async filter_product({ request, auth }: HttpContextContract) {
    const access = await auth.authenticate();
    let { provider_id, page, limit, filter } = paginate(
      await request.validate(filter_product_validator)
    );
    let query = Database.query()
      .from("products")
      .select("avatar_url")
      .select("photos")
      .select("price")
      .select("name")
      .select("location")
      .select("location")
      .select("title")
      .select("caracteristique")
      .select("status")
      .select("description")
      .select('category_id')
      .select('express_time')
      .select("products.id as id")
      .select("products.created_at as product_created_at")
      .innerJoin("accounts", "accounts.id", "products.account_id");
    // .where("status", Product.STATUS.VALID); //TODO product.valid

    if (provider_id) {
      query = query.where("account_id", provider_id);
    }
    if (provider_id && provider_id == access?.auth_table_id && filter?.status) {
      
      query = query.where("status", filter.status);
    }

    if (filter?.price) {
      query = query.andWhereBetween("price", filter.price as [number, number]);
    }

    if (filter?.text) {
      const text = filter.text;
      const regex = `%${text.split("").join("%")}%`;
      query = query.andWhere((q) => {
        q.whereLike("title", regex).orWhereLike("description", regex);
      });
    }

    if (
      filter &&
      (filter.category_id !== undefined || filter.category_id === null)
    ) {
      const list = [filter.category_id];
      await allChildren(filter.category_id, list);
      query = query.andWhereIn("category_id", list);
    }

    if (filter?.order_by) {
      switch (filter.order_by) {
        case "date_asc":
          query = query.orderBy("products.created_at", "asc");
          break;

        case "date_desc":
          query = query.orderBy("products.created_at", "desc");
          break;

        case "price_asc":
          query = query.orderBy("price", "asc");
          break;

        case "price_desc":
          query = query.orderBy("price", "desc");
          break;

        default:
          query = query.orderBy("products.created_at", "desc");
          break;
      }
    }
    const total = (await query).length;
    const products = await query.limit(limit).offset((page - 1) * limit);
    return{
      total,
      products :products.map((p) => ({ ...p, photos: JSON.parse(p.photos),caracteristique: JSON.parse(p.caracteristique) }))
    } 
  }

  public async get_product_from_ids({ request }: HttpContextContract) {
    const { ids } = await request.validate(get_product_from_ids_validator);

    const products = await Database.from("accounts")
      .select("*")
      .select("accounts.id as aid")
      .select("accounts.created_at as acreated_at")
      .select("accounts.updated_at as aupdated_at")
      .innerJoin("products", "products.account_id", "accounts.id")
      .whereIn("products.id", ids);

    const accountAttributes = [
      "aid",
      "name",
      "location",
      "email",
      "avatar_url",
      "access_id",
      "acl_id",
      "phone",
      "use_whatsapp",
      "acreated_at",
      "aupdated_at",
    ];
    const accountRename = {
      aid: "id",
      aupdated_at: "updated_at",
      acreated_at: "created_at",
    };
    return products.map((product) => {
      product.provider = {};
      for (const key in product) {
        if (accountAttributes.includes(key)) {
          product.provider[accountRename[key] ?? key] = product[key];
          delete product[key];
        }
      }
      return {
        ...product,
        photos: JSON.parse(product.photos),
        provider: Account.formatAccount({
          $attributes: product.provider,
        } as any),
      };
    });
  }

  public async delete_product({ request }: HttpContextContract) {
    const { product_id } = request.body();
    await deleteFiles(product_id);
    await (await Product.find(product_id))?.delete();
    return {
      isDeleted: !(await Product.find(product_id)),
    };
  }
}
