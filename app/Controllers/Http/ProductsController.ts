import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Account from "App/Models/Account";
import Category from "App/Models/Category";
import Product from "App/Models/Product";
import { v4 } from "uuid";
import CategoriesController from "./CategoriesController";
import Env from "@ioc:Adonis/Core/Env";
import { createFile, updateFile } from "./Tools/FilesManager";
import {create_product_validator} from "App/Validators/ProductValidator";
export default class ProductsController {
  public async create_product(ctx: HttpContextContract) {
    const {request,auth} = ctx;
    const { title, description, price, category_id, caracteristique } = await request.validate({ schema: create_product_validator })

    if (!title || !description || !price || !caracteristique || !category_id) {
      return "ERROR field required : { title,sub_title,description,price,category_id,caracteristique,}";
    }

    const photos = request.files("photos");
    if (!(photos.length > 0)) {
      return "ERROR field required : files photos ";
    }

    const category = await Category.findOrFail(category_id);
    if (!category) return "ERROR category.id=" + category_id + "not found";
    if (!category.is_parentable)
      return "ERROR this category can't be use like parent category, please choise another one";
    const id = v4();
    const account = await Account.getAccountByAuth(auth);
    if (!account) {
      return "ERROR CONNEXION REQUIRED";
    }

    const photosUrl = await createFile(photos, id);
    const product = await Product.create({
      id,
      title,
      description,
      price,
      caracteristique: JSON.stringify(caracteristique),
      status: Product.STATUS.AWAIT,
      account_id: account.id,
      category_id,
      photos: JSON.stringify(photosUrl),
      // express_time:'',
      // last_appearance:'',
      // moderator_id:''
    });

    console.log({ photosUrl });

    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
      photos: photosUrl,
      id,
    };
  }

  public async update_product({ request }: HttpContextContract) {
    const attributes = [
      "title",
      "description",
      "price",
      "category_id",
      "caracteristique",
    ];
    const filesAttributes = ["photos"];
    const body = request.body();

    if (!body.id) return 'ERROR required => "id"';
    if (body.category_id) {
      //TODO trouver solution pour capturer l'error au lieu de trouver la cat..
      const category = await Category.find(body.category_id);
      if (!category) return "ERROR category not found";
    }

    const files = request.files(filesAttributes[0]);

   
    const product = await Product.findByOrFail("id", body.id);

    if (!product) {
      return "ERROR Product not found";
    }
    attributes.forEach((attribute) => {
      if (body[attribute]) product[attribute] = body[attribute];
    });
    let urls :string[]; 
    for (const filesAttribute of filesAttributes) {
      urls = await updateFile({
        files,
        filesAttribute,
        lastUrls:product[filesAttribute],
        newPseudoUrls:body[filesAttribute],
        tableId:body.id
      })
      product[filesAttribute] = JSON.stringify(urls);
    }
   
    await product.save();
    const account = await Account.findOrFail(product.account_id);
    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
    };
  }

  public async get_product({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';

    const product = await Product.findByOrFail("id", id);
    const account = await Account.findOrFail(product.account_id);
    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
    };
  }

  public async filter_product({ request }: HttpContextContract) {
    let { provider_id, page, limit, filter } = request.body() as {
      provider_id?: string;
      page?: number; //1
      limit?: number; //30
      filter?: {
        text?: string;
        order_by?: "date_desc" | "date_asc" | "price_desc" | "price_asc";
        price?: [number, number];
        category_id?: string;
        // caracteristique?: string;
      };
    };

    if (page && page < 1) return " page must be between [1 ,n] ";
    if (limit && limit < 1) return " limite must be between [1 ,n] ";
    page = page ?? 1;
    limit = limit ?? Env.get("DEFAULT_LIMIT");

    let query = Product.query().select("*");
    // .where("status", Product.STATUS.VALID); //TODO product.valid

    if (provider_id) {
      query = query.where("account_id", provider_id);
    }
    if (filter?.price) {
      query = query.andWhereBetween("price", filter.price);
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
      await CategoriesController.allChildren(filter.category_id, list);
      console.log({ list });
      query = query.andWhereIn("category_id", list);
    }

    if (filter?.order_by) {
      switch (filter.order_by) {
        case "date_asc":
          query = query.orderBy("created_at", "asc");
          break;

        case "date_desc":
          query = query.orderBy("created_at", "desc");
          break;

        case "price_asc":
          query = query.orderBy("price", "asc");
          break;

        case "price_desc":
          query = query.orderBy("price", "desc");
          break;

        default:
          query = query.orderBy("created_at", "desc");
          break;
      }
    }
    const products = await query.limit(limit).offset((page - 1) * limit);
    return {
      ...products,
    };
  }

  public async get_product_from_ids({ request }: HttpContextContract) {
    const { ids } = request.body();
    if (!Array.isArray(ids)) return 'ERROR required => "ids:uuid[]"';

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
      "acreated_at",
      "aupdated_at",
    ];
    const accountRename = {
      aid: "id",
      aupdated_at: "updated_at",
      acreated_at: "created_at",
    };
    return {
      ...products.map((product) => {
        product.provider = {};
        for (const key in product) {
          if (accountAttributes.includes(key)) {
            product.provider[accountRename[key] ?? key] = product[key];
            delete product[key];
          }
        }
        return {
          ...product,
          provider: Account.formatAccount({
            $attributes: product.provider,
          } as any),
        };
      }),
    };
  }

  public async delete_product({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    await (await Product.find(id))?.delete();
    return {
      isDeleted: !(await Product.find(id)),
    };
  }
}
