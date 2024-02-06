import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Moderator extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public name: string
   
  @column()
  public key: string
   
  @column()
  public phone: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (moderator: Moderator) {
    if(!moderator.id)moderator.id = v4()
  }

}
