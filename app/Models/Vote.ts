import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(()=>Account)
  public provider_account:  HasOne<typeof Account>

  @hasOne(()=>Account)
  public client_account:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (vote: Vote) {
    if(!vote.id)vote.id = v4()
  }
}
