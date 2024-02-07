import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
export default class RecommendationClientProviderReceiver extends BaseModel {
  
  @column()
  public recommendation_id: string

  @column()
  public receiver_account_id: string
  
  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

}
