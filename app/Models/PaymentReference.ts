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
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (paymentReference: PaymentReference) {
    paymentReference.id = v4()
  }
}
