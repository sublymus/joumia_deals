import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'

export default class AccessOauth extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public oauth_client_unique: string

  @column()
  public oauth_provider_name: string

  @column()
  public init_id: string
  
  @column()
  public auth_table_name: string

  @column()
  public auth_table_id: string

  @column()
  public original_id: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (accessOauth: AccessOauth) {
    if (accessOauth.$dirty.password) {
      accessOauth.password = await Hash.make(accessOauth.password)
    }
    accessOauth.id = v4()
  }
}
