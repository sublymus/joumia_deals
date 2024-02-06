import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'
import Account from './Account'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public text: string

  @hasOne(()=>Group)
  public group_id:  HasOne<typeof Group>

  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (message: Message) {
    if(!message.id)message.id = v4()
  }
}
