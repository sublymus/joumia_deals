import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import RecommendationAccountProduct from './RecommendationAccountProduct'
import Account from './Account'

export default class RecommendationAccountProductReceiver extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(()=>RecommendationAccountProduct)
  public recommendation_id:  HasOne<typeof RecommendationAccountProduct>

  @hasOne(()=>Account)
  public receiver_account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (recommendationAccountProductReceiver: RecommendationAccountProductReceiver) {
    recommendationAccountProductReceiver.id = v4()
  }
}
