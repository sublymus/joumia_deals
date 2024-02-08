import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import RecommendationAccountProduct from "App/Models/RecommendationAccountProduct";
import RecommendationClientAccount from "App/Models/RecommendationClientAccount";
import Env from '@ioc:Adonis/Core/Env';
import { v4 } from "uuid";

export default class RecommendationsController {
    public async add_recommendation_product({
      request,
      auth,
    }: HttpContextContract) {
      const { id: product_id } = request.body();
      if (!product_id) return 'ERROR required => "id"';
      
      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token"
      
      const id = v4();
      const recommendation = await RecommendationAccountProduct.create({
        product_id,
        my_account_id: access.auth_table_id,
        id
      });
      
      return {
        ...recommendation.$attributes,
        id
      };
    }

    public async get_product_recommendations({ request, auth }: HttpContextContract) {
      let { limit, page } = request.body();
      if (page < 1) return " page must be between [1 ,n] ";
      if (limit < 1) return " limit must be between [1 ,n] ";
      page = page??1;
      limit = limit??Env.get('DEFAULT_LIMIT')

      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token"
      
      const recommendations = await Database.from("recommendation_account_products")
      .select("*")
      .select("recommendation_account_products.created_at as recommendation_created_at")
      .select("recommendation_account_products.updated_at as recommendation_updated_at")
      .select("products.created_at as product_created_at")
      .select("products.updated_at as product_updated_at")
      .innerJoin("products", "products.id", "product_id")
      .where("my_account_id",access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);
      
      return recommendations
    }
  
    public async delete_recommendation_product({ request, auth }: HttpContextContract) {
      const { id } = request.body();
      if (!id) return 'ERROR required => "id"';
      
      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token";
      
      const recommendation = await RecommendationAccountProduct.find(id);
      if(!recommendation) return  "ERROR recommendation not found";
      if(recommendation.my_account_id !== access.auth_table_id) return "ERROR permission denied"
      await recommendation.delete();
      
      return {
        deleted: recommendation.$isDeleted,
      };
    }

    public async add_recommendation_account({
      request,
      auth,
    }: HttpContextContract) {
      const { id: account_id } = request.body();
      if (!account_id) return 'ERROR required => "id"';
      
      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token"

      const id = v4();
      const recommendation = await RecommendationClientAccount.create({
        my_account_id: access.auth_table_id,
        other_account_id: account_id,
        id
      });
    
      return {
        ...recommendation.$attributes,
        id
      };
    }

    public async get_account_recommendations({ request, auth }: HttpContextContract) {
      let { limit, page } = request.body();
      if (page < 1) return " page must be between [1 ,n] ";
      if (limit < 1) return " limit must be between [1 ,n] ";
      page = page??1;
      limit = limit??Env.get('DEFAULT_LIMIT')
     
      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token"
     
      const recommendations = await Database.from("recommendation_client_accounts")
      .select("*")
      .select("recommendation_client_accounts.created_at as recommendation_created_at")
      .select("recommendation_client_accounts.updated_at as recommendation_updated_at")
      .select("accounts.created_at as account_created_at")
      .select("accounts.updated_at as account_updated_at")
      .select("recommendation_client_accounts.id as id")
      .innerJoin("accounts", "accounts.id", "other_account_id")
      .where("my_account_id",access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);
      
      return recommendations
    }
  
    public async delete_recommendation_account({ request, auth }: HttpContextContract) {
      const { id } = request.body();
      if (!id) return 'ERROR required => "id"';
     
      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token"
     
      const recommendation = await RecommendationClientAccount.find(id)
      if(!recommendation) return  "ERROR recommendation not found";
      if(recommendation.my_account_id !== access.auth_table_id) return "ERROR permission denied"
      await recommendation.delete();
     
      return {
        deleted: recommendation.$isDeleted,
      };
    }
}
