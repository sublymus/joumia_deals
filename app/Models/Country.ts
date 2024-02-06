import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: string
 
  @column()
  public name: string

  @column()
  public currency: string

  @column()
  public language: string

  @column()
  public payment_method: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (country: Country) {
    if(!country.id)country.id = v4()
  }
}
