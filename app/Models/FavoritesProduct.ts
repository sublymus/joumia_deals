import { DateTime } from 'luxon'
import { BaseModel,  column } from '@ioc:Adonis/Lucid/Orm'


export default class FavoritesProduct extends BaseModel {

  @column()
  public product_id:  string

  @column()
  public account_id: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
   public updated_at: DateTime

}
 