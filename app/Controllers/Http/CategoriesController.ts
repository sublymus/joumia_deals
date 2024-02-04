import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";

export default class CategoriesController {
  public async create_category({ request }: HttpContextContract) {
    const { label, caracteristique_field, parent_category_id, isParentable } =
      request.body();
    if (
      !label ||
      !caracteristique_field ||
      !parent_category_id ||
      !isParentable
    ) {
      return "ERROR field required : {label,carateristiqueField,parent_category_id,isParentable}";
    }
    const cateogry = await Category.create({
      label,
      caracteristique_field,
      parent_category_id,
      isParentable,
    });
    return {
      ...cateogry,
      id: await Category.getID(cateogry),
    };
  }

  public async update_category({ request }: HttpContextContract) {
    const { id ,label, caracteristique_field, parent_category_id, isParentable } =
      request.body();
    if(!id)return 'ERROR required => "id"'
    const cateogry = await Category.query()
      .where("id", id)
      .update({
        label,
        caracteristique_field,
        parent_category_id,
        isParentable,
      });
    return {
      ...cateogry,
    };
  }

  public async get_category({ request }: HttpContextContract) {
    const { id } = request.body();
    if(!id)return 'ERROR required => "id"'

    return {
      ... await Category.find(id),
    };
  }

  public async get_category_from_ids({ request }: HttpContextContract) {
    const { ids } = request.body();
    if(!Array.isArray(ids))return 'ERROR required => "ids:uuid[]"'

    return {
      ... await Category.query().whereIn('id',ids),
    };
  }

  public async get_category_child_list({ request }: HttpContextContract) {
    const { id } = request.body();
    if(!id)return 'ERROR required => "id"'

    return {
      ... await Category.query().where('parent_category_id',id),
    };
  }
  public async delete_category({ request }: HttpContextContract) {
    const { id } = request.body();
    if(!id)return 'ERROR required => "id"'
    await (await Category.find(id))?.delete()
    return {
        isDeleted :!(await Category.find(id)),
    };
  }
  
}
