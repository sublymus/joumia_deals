import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import FavoritesProduct from "App/Models/FavoritesProduct";
import {
  add_favorite_product_validator,
  delete_favorite_product_validator,
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
    let { limit, page } = paginate(
      await request.validate(get_favorite_products_validator)
    );
    const access = await auth.authenticate();

    const favorites = await Database.from("favorites_products")
    .select("avatar_url")
    .select("photos")
    .select("price")
    .select("name")
    .select("location")
    .select("title")
    .select("product_id")
    .select('category_id')
    .select("caracteristique")
    .select("description")
    .select('express_time')
    .select("status")
      .select("favorites_products.created_at as favorite_created_at")
      .select("products.created_at as product_created_at")
      .innerJoin("products", "products.id", "product_id")
      .innerJoin("accounts", "accounts.id", "products.account_id")
      .where("favorites_products.account_id", access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);

    return {
      favorites : favorites.map((p) => ({ ...p, photos: JSON.parse(p.photos),caracteristique: JSON.parse(p.caracteristique) })),
      total:  (await getTotalFavorites(access.auth_table_id)).length
    };
  }

  public async get_all_favorite_products_id({ auth }: HttpContextContract) {
    const access = await auth.authenticate();
    return  await getTotalFavorites(access.auth_table_id)
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
}

async function getTotalFavorites(account_id:string) {
  const total = await Database.from("favorites_products")
    .select("*")
    .where("favorites_products.account_id", account_id);

  return total.map(m=>m.product_id);
}
