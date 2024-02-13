import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class add_favorite_product_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_favorite_products_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number.optional(),
    limit: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}

export class delete_favorite_product_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class add_favorite_account_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_favorite_accounts_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number.optional(),
    limit: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}

export class delete_favorite_account_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}
