import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public isDiscussion: boolean

  @column()
  public product_id: HasOne<typeof Product>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

  @beforeSave()
  public static async setUUID (group: Group) {
    if(!group.id)group.id = v4()
  }
}
