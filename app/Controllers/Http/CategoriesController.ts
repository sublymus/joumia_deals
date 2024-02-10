import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";
import { v4 } from "uuid";

export default class CategoriesController {
  public async create_category({ request }: HttpContextContract) {
    const { label, caracteristique_field, parent_category_id, is_parentable } =
      request.body();

    if (!label || !caracteristique_field || is_parentable == undefined) {
      return "ERROR field required : {label,carateristiqueField,parent_category_id,isParentable}";
    }
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
    const attributes = [
      "label",
      "parent_category_id",
      "is_parentable",
    ];
    const jsonAttributes = [
      "caracteristique_field"
    ]
    const body = request.body();

    if (!body.id) return 'ERROR required => "id"';
    const category = await Category.findByOrFail("id", body.id);
    attributes.forEach((attribute) => {
      if (body[attribute]) category[attribute] = body[attribute];
    });  
    jsonAttributes.forEach((attribute) => {
      if (body[attribute]) category[attribute] = JSON.stringify(body[attribute]);
    });
    await category.save();
    return category.$attributes;
  }

  public async get_category({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';

    return (await Category.findOrFail(id)).$attributes;
  }

  public async get_category_from_ids({ request }: HttpContextContract) {
    const { ids } = request.body();
    if (!Array.isArray(ids)) return 'ERROR required => "ids:uuid[]"';

    return await Category.query().whereIn("id", ids);
  }

  public async get_category_child_list({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';

    return await Category.query().where("parent_category_id", id);
  }

  public async get_category_all_child_list({ request }: HttpContextContract) {
    const { id } = request.body();
    if (typeof id !== "string" && id !== null) return 'ERROR required => "id"';
    const listModel = [];
    const listId = [];
    await CategoriesController.allChildren(id, listId, listModel, true);
    return listModel;
  }

  private static allCategories: any = {};

  public static async allChildren(
    id: string | null,
    listId: string[],
    listModel?: any[],
    includes?: boolean
  ) {
    if (includes) {
      const cat = await Category.find(id);
      if (cat) {
        listId.push(cat.id);
        listModel?.push(cat.$attributes);
      }
    }
    let query = Category.query();
    if (id) query = query.where("parent_category_id", id);
    else query = query.whereNull("parent_category_id");
    const children = await query;
    for (const category of children) {
      if (!listId.includes(category.id)) {
        if (!CategoriesController.allCategories[category.id])
          CategoriesController.allCategories[category.id] =
            category.$attributes;
        listId.push(category.id);
        listModel?.push(category.$attributes);
        await this.allChildren(category.id, listId, listModel);
      }
    }
  }

  public static async parentList(id:string){
    
    if (!id) return null;
    const categories: any[] = [];
    while (true) {
      const category = await Category.find(id);
      if (category) {
        categories.push(category.$attributes);
        id = category.parent_category_id;
      } else {
        break;
      }
    }
    return categories
  }

  public async get_category_parents({ request }: HttpContextContract) {
    let { id } = request.body();
   
    return await CategoriesController.parentList(id);
  }
  public async delete_category({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    await (await Category.find(id))?.delete();
    return {
      isDeleted:true
    };
  }
}
