import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'

export default class RecommendationAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public my_account_id: string

  @column()
  public other_account_id: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime


  @beforeSave()
  public static async setUUID (transaction: RecommendationAccount) {
    if(!transaction.id)transaction.id = v4()
  }

}
