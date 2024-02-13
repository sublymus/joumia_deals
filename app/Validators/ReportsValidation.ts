import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

const REPORT_MESSAGE_LENGTH = 10;

export class report_product_validator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
      product_id: schema.string([rules.uuid({ version: 4 })]),
      message: schema.string([
        rules.minLength(REPORT_MESSAGE_LENGTH)
      ])
    });
  
    public messages: CustomMessages = {};
  }

  export class get_products_reported_validator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
        page: schema.number.optional(),
        limit: schema.number.optional(),
    });
  
    public messages: CustomMessages = {};
  }

  export class report_account_validator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
      account_id: schema.string([rules.uuid({ version: 4 })]),
      message: schema.string([
        rules.minLength(REPORT_MESSAGE_LENGTH)
      ])
    });
  
    public messages: CustomMessages = {};
  }

  export class get_accounts_reported_validator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
        page: schema.number.optional(),
        limit: schema.number.optional(),
    });
  
    public messages: CustomMessages = {};
  }