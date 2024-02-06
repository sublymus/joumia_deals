import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export enum PRODUCT_STATUS{
  AWAIT,VALID,REJECT,
} 
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public subtitle: string

  @column.dateTime({ autoCreate: true })
  public express_time: DateTime

  @column.dateTime({ autoCreate: true })
  public last_appearance: DateTime

  @column()
  public description: string

  @column()
  public caracteristique: string

  @column()
  public status: PRODUCT_STATUS

  @column()
  public price: number

  @column()
  public category_id: string

  @column()
  public account_id: string
  
  @column()
  public moderator_id : string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (product: Product) {
   if(!product.id)product.id = v4()
  }
}
