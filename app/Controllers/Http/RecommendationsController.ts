import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import RecommendationProduct from "App/Models/RecommendationProduct";
import RecommendationAccount from "App/Models/RecommendationAccount";
import { v4 } from "uuid";
import { add_recommendation_account_validator, add_recommendation_product_validator, delete_recommendation_account_validator, delete_recommendation_product_validator, get_account_recommendations_validator, get_product_recommendations_validator } from "App/Validators/RecommendationsValidator";
import { paginate } from "./Tools/Utils";

export default class RecommendationsController {
    public async add_recommendation_product({
      request,
      auth,
    }: HttpContextContract) {
      const { product_id } = await request.validate(add_recommendation_product_validator);
      
      const access = await auth.authenticate();
      if(!access.auth_table_id) return  "E_INVALID_API_TOKEN: Invalid API token"
      
      const id = v4();
      const recommendation = await RecommendationProduct.create({
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
      let { limit, page } = paginate(await request.validate(get_product_recommendations_validator))
      
      const access = await auth.authenticate();
      
      const recommendations = await Database.from("recommendation_products")
      .select("*")
      .select("recommendation_products.created_at as recommendation_created_at")
      .select("recommendation_products.updated_at as recommendation_updated_at")
      .select("products.created_at as product_created_at")
      .select("products.updated_at as product_updated_at")
      .innerJoin("products", "products.id", "product_id")
      .where("my_account_id",access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);
      
      return recommendations
    }
  
    public async delete_recommendation_product({ request, auth }: HttpContextContract) {
      const { product_id } = await request.validate(delete_recommendation_product_validator);
      
      const access = await auth.authenticate();
      
      const recommendation = await RecommendationProduct.find(product_id);
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
      const { account_id } = await request.validate(add_recommendation_account_validator);
      
      const access = await auth.authenticate();

      const id = v4();
      const recommendation = await RecommendationAccount.create({
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
      let { limit, page } =paginate( await request.validate(get_account_recommendations_validator));
     
      const access = await auth.authenticate();
     
      const recommendations = await Database.from("recommendation_accounts")
      .select("*")
      .select("recommendation_accounts.created_at as recommendation_created_at")
      .select("recommendation_accounts.updated_at as recommendation_updated_at")
      .select("accounts.created_at as account_created_at")
      .select("accounts.updated_at as account_updated_at")
      .select("recommendation_accounts.id as id")
      .innerJoin("accounts", "accounts.id", "other_account_id")
      .where("my_account_id",access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);
      
      return recommendations
    }
  
    public async delete_recommendation_account({ request, auth }: HttpContextContract) {
      const { account_id } = await request.validate(delete_recommendation_account_validator);

      const access = await auth.authenticate();

      const recommendation = await RecommendationAccount.find(account_id)
      if(!recommendation) return  "ERROR recommendation not found";
      if(recommendation.my_account_id !== access.auth_table_id) return "ERROR permission denied"
      await recommendation.delete();
     
      return {
        deleted: recommendation.$isDeleted,
      };
    }
}
