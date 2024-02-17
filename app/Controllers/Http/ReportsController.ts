import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReportProduct from "App/Models/ReportProduct";
import { get_products_reported_validator, report_product_validator } from "App/Validators/ReportsValidation";
import { paginate } from "./Tools/Utils";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ReportsController {
  public async report_product({ request, auth }: HttpContextContract) {
    const { product_id, message } =await request.validate(report_product_validator);
    const access = await auth.authenticate();

      const report = await ReportProduct.create({
      message,
      my_account_id: access.auth_table_id,
      product_id,
    });
    return report.$attributes
  }

  public async get_products_reported({ request, auth }: HttpContextContract) {
    let { limit, page } = paginate( await request.validate(get_products_reported_validator))
    
    const access = await auth.authenticate();
    

    const query = Database.from("report_products")
      .select("avatar_url")
      .select("photos")
      .select("price")
      .select("name")
      .select("location")
      .select("title")
      .select("product_id")
      .select("caracteristique")
      .select("status")
      .select("report_products.created_at as report_created_at")
      .select("products.created_at as product_created_at")
      .innerJoin("products", "products.id", "product_id")
      .innerJoin("accounts", "accounts.id", "my_account_id")
      .where("my_account_id", access.auth_table_id)
      
    const total = (await query).length;
    const reported = await query.limit(limit).offset((page - 1) * limit);
    return {
      total,
      reported: reported.map((p) => ({ ...p, photos: JSON.parse(p.photos),caracteristique: JSON.parse(p.caracteristique) })),
      page,
      limit
    };
  }

}
