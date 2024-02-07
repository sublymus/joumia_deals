import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Report from 'App/Models/Report';
import { v4 } from 'uuid';

export default class ReportsController {

    public async report_product({ request , auth}: HttpContextContract) {
        const {id:product_id, message} = request.body() as {id:string, message:string};
        const account = await auth.authenticate();
        if (!product_id) return 'ERROR required => "id"';
        if (!message ) return 'ERROR required => "id"';
        if(message.length<10)return 'message length required minimux 10 character';
        const id = v4();
        const report = await Report.create({
            id,
            message,
            client_account_id:account.id,
            product_id
        })
        return {
            ...report.$attributes,
            id
        }
      }
      public async get_products_reported({ request ,auth}: HttpContextContract) {
          const {limite,page} = request.body();
          if(page<1) return ' page must be between [1 ,n] ';
          if(limite<1) return ' limite must be between [1 ,n] ';
          const account = await auth.authenticate();
          const reports = await Report.query().where('client_account_id',account.id).limit(limite).offset((page-1)*limite)
          return {
              ...reports
          }
        }
}
