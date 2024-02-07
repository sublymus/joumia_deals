import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class RecommendationAccountProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public product_id: string

  @column()
  public my_account_id: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

}
