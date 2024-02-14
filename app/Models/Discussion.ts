import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Discussion extends BaseModel {
  @column({ isPrimary: true })
  public id: string | null

  @column()
  public product_id: string

  @column()
  public provider_id: string |null
  
  @column()
  public client_id: string |null

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (discussion: Discussion) {
    if(!discussion.id)discussion.id = v4()
  }
}
