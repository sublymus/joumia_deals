import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'

export default class RecommendationClientProvider extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @hasOne(()=>Account)
  public provider_account:  HasOne<typeof Account>

  @hasOne(()=>Account)
  public client_account:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (recommendationClientProvider: RecommendationClientProvider) {
    recommendationClientProvider.id = v4()
  }
}