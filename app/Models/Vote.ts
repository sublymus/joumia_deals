import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public star : number;
  
  @column()
  public provider_account_id:  string
 
  @column()
  public client_account_id:  string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (vote: Vote) {
    if(!vote.id)vote.id = v4()
  }
}
