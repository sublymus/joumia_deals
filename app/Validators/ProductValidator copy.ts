import { schema} from '@ioc:Adonis/Core/Validator'

export const get_discussions_validator  = schema.create({
  page:schema.number.optional(),
  limit:schema.number.optional(),
})

export const get_messages_validator  = schema.create({
  product_id:schema.string(),
  page:schema.number.optional(),
  limit:schema.number.optional(),
})

export const get_message_validator  = schema.create({
  message_id:schema.string(),
})

export const send_message_validator  = schema.create({
  product_id:schema.string(),
  text:schema.string(),
})

export const delete_discussions_validator  = schema.create({
  product_id:schema.string(),
})