import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import RecommendationAccountProduct from "App/Models/RecommendationAccountProduct";
import RecommendationClientAccount from "App/Models/RecommendationClientAccount";

export default class RecommendationsController {
    public async add_recommendation_product({
      request,
      auth,
    }: HttpContextContract) {
      const { id: product_id } = request.body();
      const account = await auth.authenticate();
      if (!product_id) return 'ERROR required => "id"';
  
      const recommendation = await RecommendationAccountProduct.create({
        product_id,
        my_account_id: account.id,
      });
      return {
        ...recommendation.$attributes,
      };
    }
    public async get_product_recommendations({ request, auth }: HttpContextContract) {
      const { limite, page } = request.body();
      if (page < 1) return " page must be between [1 ,n] ";
      if (limite < 1) return " limite must be between [1 ,n] ";
      const account = await auth.authenticate();
      const recommendations = await Database.from("recommendation_account_products")
      .select("*")
      .select("recommendation_account_products.created_at as recommendation_created_at")
      .select("recommendation_account_products.updated_at as recommendation_updated_at")
      .select("products.created_at as product_created_at")
      .select("products.updated_at as product_updated_at")
      .innerJoin("products", "products.id", "product_id")
      .whereColumn("my_account_id",account.id)
      .limit(limite)
      .offset((page - 1) * limite);
      
      return {
        ...recommendations,
      };
    }
  
    public async delete_recommendation_product({ request, auth }: HttpContextContract) {
      const { id } = request.body();
      if (!id) return 'ERROR required => "id"';
      const account = await auth.authenticate();
      const recommendations = await RecommendationAccountProduct.query()
        .where("my_account_id", account.id)
        .andWhere("product_id", id)
        .limit(1)
  
      const recommendation = recommendations[0];
      await recommendation?.delete();
      return {
        deleted: !!recommendation?.$isDeleted,
      };
    }
    public async add_recommendation_account({
      request,
      auth,
    }: HttpContextContract) {
      const { id: account_id } = request.body();
      const account = await auth.authenticate();
      if (!account_id) return 'ERROR required => "id"';
  
      const recommendation = await RecommendationClientAccount.create({
        my_account_id: account.id,
        other_account_id: account_id,
      });
      return {
        ...recommendation.$attributes,
      };
    }

    public async get_account_recommendations({ request, auth }: HttpContextContract) {
      const { limite, page } = request.body();
      if (page < 1) return " page must be between [1 ,n] ";
      if (limite < 1) return " limite must be between [1 ,n] ";
      const account = await auth.authenticate();
      const recommendations = await Database.from("recommendation_client_accounts")
      .select("*")
      .select("recommendation_client_accounts.created_at as recommendation_created_at")
      .select("recommendation_client_accounts.updated_at as recommendation_updated_at")
      .select("products.created_at as product_created_at")
      .select("products.updated_at as product_updated_at")
      .innerJoin("products", "products.id", "product_id")
      .whereColumn("my_account_id",account.id)
      .limit(limite)
      .offset((page - 1) * limite);
      
      return {
        ...recommendations,
      };
    }
  
    public async delete_recommendation_account({ request, auth }: HttpContextContract) {
      const { id } = request.body();
      if (!id) return 'ERROR required => "id"';
      const account = await auth.authenticate();
      const recommendations = await RecommendationClientAccount.query()
        .where("my_account_id", account.id)
        .andWhere("other_account_id", id)
        .limit(1)
  
      const recommendation = recommendations[0];
      await recommendation?.delete();
      return {
        deleted: !!recommendation?.$isDeleted,
      };
    }
}
