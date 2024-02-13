import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import {
  create_category_validation,
  delete_category_validator,
  get_category_all_child_list_validation,
  get_category_child_list_validation,
  get_category_from_ids_validation,
  get_category_parents_validator,
  get_category_validation,
  update_category_validation,
} from "App/Validators/CategoryValidator";
import { v4 } from "uuid";
import { allChildren, parentList } from "./Tools/CategoriesUtil";

export default class CategoriesController {
  public async create_category({ request }: HttpContextContract) {
    const { label, caracteristique_field, parent_category_id, is_parentable } =
      await request.validate(create_category_validation);

    const id = v4();
    const category = await Category.create({
      label,
      caracteristique_field: JSON.stringify(caracteristique_field),
      parent_category_id,
      is_parentable: !!is_parentable,
      id,
    });

    return {
      ...category.$attributes,
      id,
    };
  }

  public async update_category({ request }: HttpContextContract) {
    const attributes = ["label", "parent_category_id", "is_parentable"];
    const jsonAttributes = ["caracteristique_field"];
    const body = await request.validate(update_category_validation);

    const category = await Category.findByOrFail("id", body.category_id);

    attributes.forEach((attribute) => {
      if (body[attribute]) category[attribute] = body[attribute];
    });

    jsonAttributes.forEach((attribute) => {
      if (body[attribute])
        category[attribute] = JSON.stringify(body[attribute]);
    });

    await category.save();

    return category.$attributes;
  }

  public async get_category({ request }: HttpContextContract) {
    const { category_id } = await request.validate(get_category_validation);
    return (await Category.findOrFail(category_id)).$attributes;
  }

  public async get_category_from_ids({ request }: HttpContextContract) {
    const { category_ids } = await request.validate(get_category_from_ids_validation);
    return await Category.query().whereIn("id", category_ids);
  }

  public async get_category_child_list({ request }: HttpContextContract) {
    const { category_id } = await request.validate(get_category_child_list_validation);
    return await Category.query().where("parent_category_id", category_id);
  }

  public async get_category_all_child_list({ request }: HttpContextContract) {
    const { category_id } = await request.validate(
      get_category_all_child_list_validation
    );

    const listModel = [];
    const listId = [];

    await allChildren(category_id, listId, listModel, true);

    return listModel;
  }


  public async get_category_parents({ request }: HttpContextContract) {
    let { category_id } = await request.validate(get_category_parents_validator);

    return await parentList(category_id);
  }

  public async delete_category({ request }: HttpContextContract) {
    const { category_id } = await request.validate(delete_category_validator);
    await (await Category.find(category_id))?.delete();
    return {
      isDeleted: true,
    };
  }
}
