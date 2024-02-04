import { DateTime } from 'luxon'
import {v4} from 'uuid'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public label : string
  
  @column()
  public caracteristique_field : string
  
  @column()
  public parent_category_id:string
  
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
   
   public static async getID (category: Category) {
     return category.id
   }
}
