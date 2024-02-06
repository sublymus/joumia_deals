import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Country from './Country'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public mode : string
  
  @column()
  public price : number
  
  @hasOne(()=>Country)
  public country_id : HasOne<typeof Country>
  
  @column()
  public frais_entrant : string
  
  @column()
  public payment_reference : string
  
  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (transaction: Transaction) {
    if(!transaction.id)transaction.id = v4()
  }
}
