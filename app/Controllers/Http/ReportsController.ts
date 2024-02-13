import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReportAccount from "App/Models/ReportAccount";
import ReportProduct from "App/Models/ReportProduct";
import { get_accounts_reported_validator, get_products_reported_validator, report_account_validator, report_product_validator } from "App/Validators/ReportsValidation";
import { paginate } from "./Tools/Utils";

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
    const reports = await ReportProduct.query()
      .where("my_account_id", access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);
    return {
      ...reports,
    };
  }

  public async report_account({ request, auth }: HttpContextContract) {
    const { account_id, message } = await request.validate(report_account_validator);
    const access = await auth.authenticate();

      const report = await ReportAccount.create({
      message,
      my_account_id: access.auth_table_id,
      other_account_id : account_id
    });
    return report.$attributes
  }

  public async get_accounts_reported({ request, auth }: HttpContextContract) {
    let { limit, page } = paginate( await request.validate(get_accounts_reported_validator));
 
    const access = await auth.authenticate();
    const reports = await ReportAccount.query()
      .where("my_account_id", access.auth_table_id)
      .limit(limit)
      .offset((page - 1) * limit);
    return {
      ...reports,
    };
  }
}
