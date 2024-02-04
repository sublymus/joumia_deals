import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Country from './Country'

export default class Lieux extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public city: string

  @column()
  public commune: string

  @column()
  public quarter: string

  @column()
  public pointer: string

  @column()
  public description: string

  @hasOne(()=>Country)
  public country_id : HasOne<typeof Country>
  
  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (lieux: Lieux) {
    lieux.id = v4()
  }
}