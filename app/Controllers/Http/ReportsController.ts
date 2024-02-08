import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReportAccount from "App/Models/ReportAccount";
import ReportProduct from "App/Models/ReportProduct";

import Env from '@ioc:Adonis/Core/Env'
const REPORT_LENGTH = 5;
export default class ReportsController {
  public async report_product({ request, auth }: HttpContextContract) {
    const { id: product_id, message } = request.body() as {
      id: string;
      message: string;
    };
    const access = await auth.authenticate();
    if (!product_id) return 'ERROR required => "id"';
    if (!message) return 'ERROR required => "message"';
    if (message.length <REPORT_LENGTH)
      return `message length required minimux ${REPORT_LENGTH} character`;
    
      const report = await ReportProduct.create({
      message,
      my_account_id: access.auth_table_id,
      product_id,
    });
    return report.$attributes
  }

  public async get_products_reported({ request, auth }: HttpContextContract) {
    let { limit, page } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limit < 1) return " limit must be between [1 ,n] ";
    page = page??1;
    limit = limit ?? Env.get('DEFAULT_LIMIT'); 
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
    const { id: account_id, message } = request.body() as {
      id: string;
      message: string;
    };
    const access = await auth.authenticate();
    if (!account_id) return 'ERROR required => "id"';
    if (!message) return 'ERROR required => "message"';
    if (message.length <REPORT_LENGTH)
      return `message length required minimux ${REPORT_LENGTH} character`;
    
      const report = await ReportAccount.create({
      message,
      my_account_id: access.auth_table_id,
      other_account_id : account_id
    });
    return report.$attributes
  }

  public async get_accounts_reported({ request, auth }: HttpContextContract) {
    let { limit, page } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limit < 1) return " limit must be between [1 ,n] ";
    page = page??1;
    limit = limit ?? Env.get('DEFAULT_LIMIT'); 
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
