import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import FavoritesProduct from "App/Models/FavoritesProduct";
import FavoritesAccount from "App/Models/FavoritesAccount";
import {
  add_favorite_account_validator,
  add_favorite_product_validator,
  delete_favorite_account_validator,
  delete_favorite_product_validator,
  get_favorite_accounts_validator,
  get_favorite_products_validator,
} from "App/Validators/FavoritesValidator";
import { paginate } from "./Tools/Utils";

export default class FavoritesController {
  public async add_favorite_product({ request, auth }: HttpContextContract) {
    const { product_id } = await request.validate(
      add_favorite_product_validator
    );
    const access = await auth.authenticate();

    const favorite = await FavoritesProduct.create({
      account_id: access.auth_table_id,
      product_id,
    });
    return favorite.$attributes;
  }

  public async get_favorite_products({ request, auth }: HttpContextContract) {
    let { limit, page } =paginate(await request.validate(
      get_favorite_products_validator
    ))
    const access = await auth.authenticate();

    const favorites = await Database.from("favorites_products")
      .select("*")
      .select("favorites_products.created_at as favorite_created_at")
      .select("favorites_products.updated_at as favorite_updated_at")
      .select("products.created_at as product_created_at")
      .select("products.updated_at as product_updated_at")
      .innerJoin("products", "products.id", "product_id")
      .where("favorites_products.account_id", access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);

    return favorites;
  }

  public async delete_favorite_product({ request, auth }: HttpContextContract) {
    const { product_id } = await request.validate(
      delete_favorite_product_validator
    );
    const access = await auth.authenticate();

    await FavoritesProduct.query()
      .where("account_id", access.auth_table_id)
      .andWhere("product_id", product_id)
      .delete();

    return {
      deleted: true,
    };
  }

  public async add_favorite_account({ request, auth }: HttpContextContract) {
    const { account_id } =  await request.validate(
      add_favorite_account_validator
    );
    if (!account_id) return 'ERROR required => "id"';
    const access = await auth.authenticate();

    const favorite = await FavoritesAccount.create({
      my_account_id: access.auth_table_id,
      other_account_id: account_id,
    });
    return favorite.$attributes;
  }

  public async get_favorite_accounts({ request, auth }: HttpContextContract) {
    let { limit, page } = paginate(await request.validate(
      get_favorite_accounts_validator
    ));

    const access = await auth.authenticate();

    const favorites = await Database.from("favorites_accounts")
      .select("*")
      .select("favorites_accounts.created_at as favorite_created_at")
      .select("favorites_accounts.updated_at as favorite_updated_at")
      .select("accounts.created_at as account_created_at")
      .select("accounts.updated_at as account_updated_at")
      .innerJoin("accounts", "accounts.id", "my_account_id")
      .where("my_account_id", access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);

    return favorites;
  }

  public async delete_favorite_account({ request, auth }: HttpContextContract) {
    const { account_id } = await request.validate(
      delete_favorite_account_validator
    );
    const access = await auth.authenticate();
    console.log({ account_id, table: access.auth_table_id });

    await FavoritesAccount.query()
      .where("other_account_id", account_id)
      .andWhere("my_account_id", access.auth_table_id)
      .delete();

    return {
      deleted: true,
    };
  }
}
