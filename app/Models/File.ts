import { DateTime } from "luxon";
import { v4 } from "uuid";
import {
  BaseModel,
  beforeSave,
  column,
} from "@ioc:Adonis/Lucid/Orm";

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public extension: string;

  @column()
  public mine: string;

  @column()
  public url: string;

  @column()
  public label: string;

  @column()
  public size: number;
  
  @column()
  public table_name: string;
  
  @column()
  public table_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async setUUID(file: File) {
    if(!file.id)file.id = v4();
  }
}
