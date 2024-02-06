import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import RecommendationClientProvider from './RecommendationClientProvider'
import Account from './Account'

export default class RecommendationClientProviderReceiver extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @hasOne(()=>RecommendationClientProvider)
  public recommendation_id:  HasOne<typeof RecommendationClientProvider>

  @hasOne(()=>Account)
  public receiver_account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (recommendationClientProviderReceiver: RecommendationClientProviderReceiver) {
    if(!recommendationClientProviderReceiver.id)recommendationClientProviderReceiver.id = v4()
  }
}
