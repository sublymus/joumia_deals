import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class PaymentReference extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public sum: number
  
  @column()
  public method_payment: string
  
  @column()
  public payment_references: string
  
  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (paymentReference: PaymentReference) {
    if(!paymentReference.id)paymentReference.id = v4()
  }
}
