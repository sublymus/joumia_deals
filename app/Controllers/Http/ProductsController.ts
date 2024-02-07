import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Account from "App/Models/Account";
import Category from "App/Models/Category";
import Product, { PRODUCT_STATUS } from "App/Models/Product";
import { v4 } from "uuid";

export default class ProductsController {
  public async create_product({ request, auth }: HttpContextContract) {
    const {
      title,
      subtitle,
      description,
      price,
      category_id,
      caracteristique,
    } = request.body();
    //    console.log({ label, caracteristique_field, last_appearance,parent_product_id, is_parentable });

    if (
      !title ||
      !subtitle ||
      !description ||
      !price ||
      !caracteristique ||
      !category_id
    ) {
      return "ERROR field required : { title,sub_title,description,price,category_id,caracteristique,}";
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
    const product = await Product.create({
      id,
      title,
      subtitle,
      description,
      price,
      caracteristique,
      status: PRODUCT_STATUS.AWAIT,
      account_id: account.id,
      category_id,
      // express_time:'',
      // last_appearance:'',
      // moderator_id:''
    });
    return {
      ...product.$attributes,
      provider: Account.formatAccount(account),
      id,
    };
  }

  public async update_product({ request }: HttpContextContract) {
    const attributes = [
      "title",
      "sub_title",
      "description",
      "price",
      "category_id",
      "caracteristique",
    ];
    const body = request.body();

    if (!body.id) return 'ERROR required => "id"';
    const product = await Product.findByOrFail("id", body.id);
    attributes.forEach((attribute) => {
      if (body[attribute]) product[attribute] = body[attribute];
    });
    product.save();
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

  // public async get_products({ request }: HttpContextContract) {
  //   const {  } = request.body() as {
  //     provider_id?: string;
  //     page?: number;//1
  //     limit?: number; //30
  //     filter?: {
  //       name?: string;
  //       order_by?: "date_desc" | "date_asc" | "price_desc" | "price_asc";
  //       prix?: [min, max];
  //       category_id?: uuid;
  //       caracteristique?: string;
  //     };
  //   };
  //   if (!id) return 'ERROR required => "id"';

  //   const product = await Product.findByOrFail("id", id);
  //   const account = await Account.findOrFail(product.account_id);
  //   return {
  //     ...product.$attributes,
  //     provider: Account.formatAccount(account),
  //   };
  // }

  public async get_product_from_ids({ request }: HttpContextContract) {
    const { ids } = request.body();
    if (!Array.isArray(ids)) return 'ERROR required => "ids:uuid[]"';

    const products = await Database.from("accounts")
      .select("*")
      .select("accounts.id as aid")
      .select("accounts.created_at as acreated_at")
      .select("accounts.updated_at as aupdated_at")
      .innerJoin("products", "products.account_id", "accounts.id")
      // .whereColumn("products.account_id", "accounts.id")
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
      acl_id: "",
      access_id: "",
      aid: "id",
      aupdated_at: "updated_at",
      acreated_at: "created_at",
    };
    return {
      ...products.map((product) => {
        product.provider = {};
        for (const key in product) {
          if (accountAttributes.includes(key)) {
            product.provider[accountRename[key] ? accountRename[key] : key] =
              product[key];
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
