import { DateTime } from "luxon";
import { v4 } from "uuid";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public label: string;

  @column()
  public caracteristique_field: string;

  @column()
  public parent_category_id: string;

  @column()
  public is_parentable: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async setUUID(category: Category) {
    if (!category.id) category.id = v4();
  }

  public static async updateOne(category: Category, data: any) {
    const attributes = [
      "label",
      "caracteristique_field",
      "parent_category_id",
      "is_parentable",
    ];

    if (!data.id) return 'ERROR required => "id"';
    
    attributes.forEach((attribute) => {
      if (data[attribute]) category[attribute] = data[attribute];
    });
    category.save();
  }
}
