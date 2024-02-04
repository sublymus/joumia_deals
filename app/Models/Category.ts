import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public babel : string
  
  @column()
  public caracteristiqueField : string
  
  @hasOne(()=>Category)
  public parent_category_id:  HasOne<typeof Category>
  
  @column()
  public isParentable : boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updatedAt: DateTime

  @beforeSave()
  public static async setUUID (category: Category) {
    category.id = v4()
  }
}
