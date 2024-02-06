import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Group from './Group'
import Rule from './Rule'

export default class Member extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public text: string

  @hasOne(()=>Group)
  public group_id:  HasOne<typeof Group>

  @hasOne(()=>Rule)
  public rules_id:  HasOne<typeof Rule>

  @hasOne(()=>Account)
  public account_id:  HasOne<typeof Account>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (member: Member) {
    if(!member.id)member.id = v4()
  }
}
