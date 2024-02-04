import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public location: string
  
  @column()
  public email: string
  
  @column()
  public avatar_url: string

  @column()
  public access_id: string
  
  @column()
  public phone: string

  @column()
  public acl_id: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime 

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (account: Account) {
    account.id = v4()
  }
}
