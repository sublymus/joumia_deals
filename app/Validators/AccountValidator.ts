import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class edit_me_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string.optional(),
    name: schema.string.optional(),
    location: schema.string.optional(),
    avatar_url: schema.string.optional(),
    use_whatsapp: schema.string.optional(),
  });

  public messages: CustomMessages = {};
}

export class get_account_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_account_from_ids_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_ids: schema
    .array()
    .members(schema.string([rules.uuid({ version: 4 })])),
  });

  public messages: CustomMessages = {};
}

export class get_all_account_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number.optional(),
    limit: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}
