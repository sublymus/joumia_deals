import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public pseudo : string

  @column()
  public password : string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (admin: Admin) {
    if(!admin.id)admin.id = v4()
  }
}
