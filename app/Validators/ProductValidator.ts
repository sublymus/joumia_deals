import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import Category from "App/Models/Category";
import Product from "App/Models/Product";

export class create_product_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    price: schema.number(),
    photos:schema.string([
      rules.toJSON()
    ]),
    category_id: schema.string(),
    caracteristique: schema.string({}, [
      rules.caracteristiqueJson({
        currentModel: Product,
        caracteristiqueModel: Category,
        caracteristiqueModel_id_field:'category_id',
        caracteristique_description_field: 'caracteristique_field'
      }),
    ]),
  });
}

export class update_product_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.string([rules.uuid({ version: 4 })]),
    title: schema.string.optional(),
    description: schema.string.optional(),
    price: schema.number.optional(),
    photos: schema.string(),
    category_id: schema.string.optional(),
    // caracteristique: schema.string.optional({}, [
    //   rules.caracteristiqueJson(this.ctx.request.body()),
    // ]),
  });

  public messages: CustomMessages = {};
}

export class get_product_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.string([rules.uuid({ version: 4 })]),
  });

  public messages: CustomMessages = {};
}

export class filter_product_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    provider_id: schema.string.optional([rules.uuid({ version: 4 })]),
    page: schema.number.optional(),
    limit: schema.number.optional(),
    filter: schema.object.optional().members({
      text: schema.string.optional(),
      order_by: schema.enum.optional(["desc", "asc"]),
      price: schema.array
        .optional([rules.minLength(2), rules.maxLength(2)])
        .members(schema.number()),
      category_id: schema.string.optional(),
    }),
  });

  public messages: CustomMessages = {};
}

export class get_product_from_ids_validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ids: schema.array().members(schema.string([rules.uuid({ version: 4 })])),
  });

  public messages: CustomMessages = {};
}

// export const create_product_validator  = schema.create({
//   title:schema.string(),
//   description:schema.string(),
//   price:schema.number(),
//   category_id:schema.string(),
//   caracteristique:schema.string({},[
//     rules.caracteristiqueJson()
//   ])
// })

// export const update_product_validator  = schema.create({
//   id:schema.string(),
//   title:schema.string.optional(),
//   description:schema.string.optional(),
//   price:schema.number.optional(),
//   category_id:schema.string.optional(),
//   photos:schema.string({},[
//     rules.trim(),
//     rules.flleList(),
//   ]), // file validation
//   caracteristique:schema.string.optional({},[
//     rules.caracteristiqueJson()
//   ])
// })
