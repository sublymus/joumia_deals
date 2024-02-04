import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Account from './Account'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public subTitle: string

  @column.dateTime({ autoCreate: true })
  public express_time: DateTime

  @column.dateTime({ autoCreate: true })
  public last_appearance: DateTime

  @column()
  public description: string

  @column()
  public caracteristique: string

  @column()
  public status: 1 | 2 | 3

  @column()
  public price: number

  @hasOne(()=>Category)
  public category_id:  HasOne<typeof Category>

  @hasOne(()=>Product)
  public product_id:  HasOne<typeof Product>

  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (product: Product) {
    product.id = v4()
  }
}
