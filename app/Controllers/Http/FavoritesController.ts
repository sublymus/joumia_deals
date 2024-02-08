import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import FavoritesProduct from "App/Models/FavoritesProduct";
import FavoritesAccount from "App/Models/FavoritesAccount";

export default class FavoritesController {
  public async add_favorite_product({ request, auth }: HttpContextContract) {
    const { id: product_id } = request.body() as { id: string };
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
    if (!product_id) return 'ERROR required => "id"';

    const favorite = await FavoritesProduct.create({
      account_id: access.auth_table_id,
      product_id,
    });
    return favorite.$attributes;
  }

  public async get_favorite_products({ request, auth }: HttpContextContract) {
    const { limite, page } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limite < 1) return " limite must be between [1 ,n] ";
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";

    const favorites = await Database.from("favorites_products")
      .select("*")
      .select("favorites_products.created_at as favorite_created_at")
      .select("favorites_products.updated_at as favorite_updated_at")
      .select("products.created_at as product_created_at")
      .select("products.updated_at as product_updated_at")
      .innerJoin("products", "products.id", "product_id")
      .where("favorites_products.account_id", access.auth_table_id)
      .limit(limite)
      .offset((page - 1) * limite);

    return favorites;
  }

  public async delete_favorite_product({ request, auth }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
    await FavoritesProduct.query()
      .where("account_id", access.auth_table_id)
      .andWhere("product_id", id)
      .delete();

    return {
      deleted: true,
    };
  }

  public async add_favorite_account({ request, auth }: HttpContextContract) {
    const { id: account_id } = request.body() as { id: string };
    if (!account_id) return 'ERROR required => "id"';
    const access = await auth.authenticate();

    const favorite = await FavoritesAccount.create({
      my_account_id: access.auth_table_id,
      other_account_id: account_id,
    });
    return favorite.$attributes;
  }
  public async get_favorite_accounts({ request, auth }: HttpContextContract) {
    const { limite, page } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limite < 1) return " limite must be between [1 ,n] ";
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";

    const favorites = await Database.from("favorites_accounts")
      .select("*")
      .select("favorites_accounts.created_at as favorite_created_at")
      .select("favorites_accounts.updated_at as favorite_updated_at")
      .select("accounts.created_at as account_created_at")
      .select("accounts.updated_at as account_updated_at")
      .innerJoin("accounts", "accounts.id", "my_account_id")
      .where("my_account_id", access.auth_table_id)
      .limit(limite)
      .offset((page - 1) * limite);

    return favorites;
  }

  public async delete_favorite_account({ request, auth }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
    console.log({ id, table: access.auth_table_id });

    await FavoritesAccount.query()
      .where("other_account_id", id)
      .andWhere("my_account_id", access.auth_table_id)
      .delete();

    return {
      deleted: true,
    };
  }
}
