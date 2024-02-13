import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class create_moderator_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    phone: schema.string(),
  });

  public messages: CustomMessages = {};
}

export class update_moderator_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    moderator_id: schema.string([rules.uuid({ version: 4 })]),
    phone: schema.string(),
    name: schema.string(),
  });

  public messages: CustomMessages = {};
}

export class change_moderator_key_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    moderator_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_moderator_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    moderator_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_moderator_from_ids_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    moderator_ids: schema
      .array()
      .members(schema.string([rules.uuid({ version: 4 })])),
  });

  public messages: CustomMessages = {};
}

export class delete_moderator_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    moderator_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}
