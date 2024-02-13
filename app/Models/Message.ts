import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public text: string
  
  @column()
  public group_id:  string

  @column()
  public files:  string

  @column()
  public account_id:  string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (message: Message) {
    if(!message.id)message.id = v4()
  }
}
