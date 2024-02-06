// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Moderator from "App/Models/Moderator";
import { v4 } from "uuid";

export default class ModeratorsController {
  public async create_moderator({ request }: HttpContextContract) {
    const { phone, name } = request.body();

    if (!phone || !name) {
      return "ERROR field required : { phone , name";
    }
    const id = v4();
    const key = v4();
    const moderator = await Moderator.create({
      phone,
      name,
      id,
    });
    return {
      ...moderator.$attributes,
      key,
      id,
    };
  }

  public async update_moderator({ request }: HttpContextContract) {
    const attributes = ["phone", "name"];
    const body = request.body();

    if (!body.id) return 'ERROR required => "id"';
    const moderator = await Moderator.findByOrFail("id", body.id);
    attributes.forEach((attribute) => {
      if (body[attribute]) moderator[attribute] = body[attribute];
    });
    moderator.save();
    return {
      ...moderator.$attributes,
    };
  }

  public async change_moderator_key({ request }: HttpContextContract) {
    const body = request.body();
    if (!body.id) return 'ERROR required => "id"';
    const moderator = await Moderator.findByOrFail("id", body.id);
    moderator.key = v4();
    moderator.save();
    return {
      ...moderator.$attributes,
    };
  }
  public async get_moderator({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';

    return {
      ...(await Moderator.findOrFail(id)).$attributes,
    };
  }

  public async get_moderator_from_ids({ request }: HttpContextContract) {
    const { ids } = request.body();
    if (!Array.isArray(ids)) return 'ERROR required => "ids:uuid[]"';

    return {
      ...(await Moderator.query().whereIn("id", ids)),
    };
  }

  public async delete_moderator({ request }: HttpContextContract) {
    const { id } = request.body();
    if (!id) return 'ERROR required => "id"';
    await (await Moderator.find(id))?.delete();
    return {
      isDeleted: !(await Moderator.find(id)),
    };
  }
}
