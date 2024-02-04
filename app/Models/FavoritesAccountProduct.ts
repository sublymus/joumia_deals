import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Account from './Account'

export default class FavoritesAccountProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(()=>Product)
  public product_id:  HasOne<typeof Product>

  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (favoritesAccountProduct: FavoritesAccountProduct) {
    favoritesAccountProduct.id = v4()
  }
}
 