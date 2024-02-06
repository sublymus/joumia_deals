import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public location: string;

  @column()
  public email: string;

  @column()
  public avatar_url: string;

  @column()
  public access_id: string;

  @column()
  public phone: string;

  @column()
  public acl_id: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  @beforeSave()
  public static async setUUID(account: Account) {
    if (!account.id) account.id = v4();
  }
  public static async getAccountByAuth(auth: HttpContextContract["auth"]) {
    const access = await auth.authenticate();

    if (!access) return null;
    return await Account.find(access.auth_table_id);
  }

  public static  formatAccount(account: Account) {
    return {
      ...account.$attributes,
      access_id: undefined,
      acl_id: undefined,
      created_at : account.created_at.toString(),
      updated_at : account.updated_at.toString()
    };
  }
}
