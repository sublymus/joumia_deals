import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import { v4 } from "uuid";

export default class CategoriesController {
  public async create_category({ request }: HttpContextContract) {
    const { label, caracteristique_field, parent_category_id, is_parentable } =
      request.body();
      
    if (
      !label ||
      !caracteristique_field || is_parentable ==undefined
    ) {
      return "ERROR field required : {label,carateristiqueField,parent_category_id,isParentable}";
    }
    const  id = v4()
    const category = await Category.create({
      label,
      caracteristique_field:JSON.stringify(caracteristique_field),
      parent_category_id,
      is_parentable: !!is_parentable,
      id
    });
    return {
      ...category.$attributes,
      id,
    };
  }

  public async update_category({ request }: HttpContextContract) {
    const attributes = ['label', 'caracteristique_field', 'parent_category_id', 'is_parentable']
    const body = request.body();
      
    if(!body.id)return 'ERROR required => "id"'
    const category =  await Category.findByOrFail("id", body.id)
    if(!category.is_parentable) return 'ERROR this category can\'t be use like parent category, pleas choise another one'
   attributes.forEach(attribute => {
    if(body[attribute])category[attribute] = body[attribute]
   });
    category.save()
    return {
      ...category.$attributes,
    };
  }

  public async get_category({ request }: HttpContextContract) {
    const { id } = request.body();
    if(!id)return 'ERROR required => "id"'

    return {
      ... (await Category.findOrFail(id)).$attributes,
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
