import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Rule extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public change_group_info: boolean

  @column()
  public delete_messages: boolean

  @column()
  public ban_user: boolean

  @column()
  public invite_users_via_link: boolean

  @column()
  public pin_message: boolean

  @column()
  public remain_anonymous: boolean

  @column()
  public add_new_admins: boolean

  @column()
  public send_message: boolean

  @column()
  public send_file: boolean
  
  @column()
  public add_member: boolean
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (rule: Rule) {
    rule.id = v4()
  }
}
