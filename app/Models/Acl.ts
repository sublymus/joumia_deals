import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
// import Account from './Account'

export default class Acl extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public account_id:  string

  @column()
  public post: boolean

  @column()
  public report: boolean

  @column()
  public create_product: boolean

  @column()
  public baned: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (acl: Acl) {
    if(!acl.id)acl.id = v4()
  }
}
