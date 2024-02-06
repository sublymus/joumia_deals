import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Account from './Account'

export default class VisitedAccountProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(()=>Product)
  public product_id:  HasOne<typeof Product>

  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (visitedAccountProduct: VisitedAccountProduct) {
    if(!visitedAccountProduct.id)visitedAccountProduct.id = v4()
  }
}
