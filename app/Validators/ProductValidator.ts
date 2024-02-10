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