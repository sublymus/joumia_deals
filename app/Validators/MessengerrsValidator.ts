import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class create_discussion_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.string([rules.uuid({version:4})])
  });

  public messages: CustomMessages = {};
}

export class send_message_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    discussion_id: schema.string([rules.uuid({version:4})]),
    text: schema.string(),
  });

  public messages: CustomMessages = {};
}


export class get_messages_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    discussion_id: schema.string([rules.uuid({version:4})]),
    page: schema.number.optional(),
    limit: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}

export class get_message_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    message_id: schema.string([rules.uuid({version:4})])
  });

  public messages: CustomMessages = {};
}


export class delete_discussions_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    discussion_id: schema.string([rules.uuid({version:4})])
  });

  public messages: CustomMessages = {};
}
