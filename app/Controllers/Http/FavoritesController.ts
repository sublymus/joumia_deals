import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import FavoritesAccountProduct from "App/Models/FavoritesAccountProduct";
import FavoritesClientProvider from "App/Models/FavoritesClientProvider";

export default class FavoritesController {
  public async add_favorite_product({ request, auth }: HttpContextContract) {
    const { id: product_id } = request.body() as { id: string };
    const account = await auth.authenticate();
    if (!product_id) return 'ERROR required => "id"';

    const favorite = await FavoritesAccountProduct.create({
      account_id: account.id,
      product_id,
    });
    return {
        added:true
    };
  }
  public async get_favorite_products({ request, auth }: HttpContextContract) {
    const { limite, page } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limite < 1) return " limite must be between [1 ,n] ";
    const account = await auth.authenticate();

      const favorites = await Database.from("favorites_account_products")
      .select("*")
      .select("favorites_account_products.created_at as favorite_created_at")
      .select("favorites_account_products.updated_at as favorite_updated_at")
      .select("products.created_at as products_created_at")
      .select("products.updated_at as products_updated_at")
      .innerJoin("products", "products.account_id", "product_id")
      .whereColumn("account_id",account.id)
      .limit(limite)
      .offset((page - 1) * limite);
      
    return {
      ...favorites
    };
  }

  public async delete_favorite_products({
    request,
    auth,
  }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    const account = await auth.authenticate();
    const favorites = await FavoritesAccountProduct.query()
      .where("account_id", account.id)
      .andWhere("product_id", id);

    const favorite = favorites[0];
    await favorite?.delete();
    return {
      deleted: !!favorite?.$isDeleted,
    };
  }

  public async add_favorite_account({ request, auth }: HttpContextContract) {
    const { id: account_id } = request.body() as { id: string };
    if (!account_id) return 'ERROR required => "id"';
    const my_account = await auth.authenticate();

    const favorite = await FavoritesClientProvider.create({
      my_account_id: my_account.id,
      other_account_id : account_id
    });
    return {
      ...favorite.$attributes,
    };
  }
  public async get_favorite_accounts({ request, auth }: HttpContextContract) {
    const { limite, page } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limite < 1) return " limite must be between [1 ,n] ";
    const account = await auth.authenticate();
    
    const favorites = await Database.from("favorites_client_providers")
    .select("*")
    .select("favorites_client_providers.created_at as favorite_created_at")
    .select("favorites_client_providers.updated_at as favorite_updated_at")
    .select("products.created_at as products_created_at")
    .select("products.updated_at as products_updated_at")
    .innerJoin("products", "products.account_id", "product_id")
    .whereColumn("my_account_id",account.id)
    .limit(limite)
    .offset((page - 1) * limite);
    
    return {
      ...favorites,
    };
  }

  public async delete_favorite_account({
    request,
    auth,
  }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    const account = await auth.authenticate();
    const favorites = await FavoritesClientProvider.query()
      .where("my_account_id", account.id)
      .andWhere("other_account_id", account.id);

    const favorite = favorites[0];
    await favorite?.delete();
    return {
      deleted: !!favorite?.$isDeleted,
    };
  }
}
