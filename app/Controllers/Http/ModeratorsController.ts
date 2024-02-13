// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Moderator from "App/Models/Moderator";
import { change_moderator_key_validator, create_moderator_validator, delete_moderator_validator, get_moderator_from_ids_validator, get_moderator_validator, update_moderator_validator } from "App/Validators/ModeratorValidator";
import { v4 } from "uuid";

export default class ModeratorsController {
  public async create_moderator({ request }: HttpContextContract) {
    const { phone, name } = await request.validate(create_moderator_validator);

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
    const body = await request.validate(update_moderator_validator);

    const moderator = await Moderator.findByOrFail("id", body.moderator_id);
    attributes.forEach((attribute) => {
      if (body[attribute]) moderator[attribute] = body[attribute];
    });
    moderator.save();
    return moderator.$attributes
  }

  public async change_moderator_key({ request }: HttpContextContract) {
    const {moderator_id} = await request.validate(change_moderator_key_validator);
    const moderator = await Moderator.findByOrFail("id", moderator_id);
    moderator.key = v4();
    moderator.save();
    return  moderator.$attributes
  }

  public async get_moderator({ request }: HttpContextContract) {
    const {  moderator_id} = await request.validate(get_moderator_validator);

    return (await Moderator.findOrFail(moderator_id)).$attributes
  }

  public async get_moderator_from_ids({ request }: HttpContextContract) {
    const { moderator_ids } = await request.validate(get_moderator_from_ids_validator);

    return (await Moderator.query().whereIn("id", moderator_ids))
  }

  public async delete_moderator({ request }: HttpContextContract) {
    const { moderator_id } = await request.validate(delete_moderator_validator);
    await (await Moderator.find(moderator_id))?.delete();
    return {
      isDeleted: !(await Moderator.find(moderator_id)),
    };
  }
}
