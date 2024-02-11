import { schema, rules} from '@ioc:Adonis/Core/Validator'


export const create_product_validator  = schema.create({
  title:schema.string(),
  description:schema.string(),
  price:schema.number(), 
  category_id:schema.string(), 
  caracteristique:schema.string({},[
    rules.caracteristiqueJson()
  ])
})

export const update_product_validator  = schema.create({
  id:schema.string(),
  title:schema.string.optional(),
  description:schema.string.optional(),
  price:schema.number.optional(), 
  category_id:schema.string.optional(),
  photos:schema.string({},[
    rules.trim(),
    rules.flleList(),
  ]), // file validation
  caracteristique:schema.string.optional({},[
    rules.caracteristiqueJson()
  ])
})

