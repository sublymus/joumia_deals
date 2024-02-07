import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public message: string
  
  @column()
  public product_id:   string

  @column()
  public client_account_id:  string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (report: Report) {
    if(!report.id)report.id = v4()
  }
}
 