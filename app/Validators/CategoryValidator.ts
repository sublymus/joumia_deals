import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class create_category_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string(),
    caracteristique_field: schema.string(),
    parent_category_id: schema.string([rules.uuid({ version: 4 })]),
    is_parentable: schema.boolean(),
  });

  public messages: CustomMessages = {};
}

export class update_category_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.string([rules.uuid({ version: 4 })]),
    label: schema.string.optional([rules.uuid({ version: 4 })]),
    caracteristique_field: schema.string.optional(),
    parent_category_id: schema.string.optional(),
    is_parentable: schema.boolean.optional(),
  });

  public messages: CustomMessages = {};
}

export class get_category_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_category_from_ids_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_ids: schema
      .array()
      .members(schema.string([rules.uuid({ version: 4 })])),
  });

  public messages: CustomMessages = {};
}

export class get_category_child_list_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_category_all_child_list_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class get_category_parents_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class delete_category_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}
