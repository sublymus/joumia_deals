import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class create_user_validation {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string(),
    name: schema.string(),
    avatar_url: schema.string.optional(),
    location: schema.string(),
    email: schema.string(),
    use_whatsapp: schema.string(),
    oauth_client_id: schema.string(),
    oauth_provider_name: schema.string()
  });

  public messages: CustomMessages = {};
}
