import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Group from "App/Models/Group";
import Message from "App/Models/Message";
import Product from "App/Models/Product";
import {
  delete_discussions_validator,
  get_discussions_validator,
  get_message_validator,
  get_messages_validator,
  send_message_validator,
} from "App/Validators/ProductValidator copy";
import { v4 } from "uuid";
import { createFiles } from "./Tools/FilesManager";
import { paginate } from "./Tools/Utils";

export default class MessengersController {
  public async get_discussions({ request, auth }: HttpContextContract) {
    const {} = await request.validate({ schema: get_discussions_validator });
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
    const discussions = await Group.query().select('*').where('account_id',access.auth_table_id)
    return  discussions;
  }

  public async send_message({ request, auth }: HttpContextContract) {
    const { product_id, text } = await request.validate({
      schema: send_message_validator,
    });
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";

    const product = await Product.find(product_id);
    if (!product) "ERROR product not found";
    let group = await Group.findBy("product_id", product_id);
    let group_id;
    if (!group) {
      group_id = v4();
      group = await Group.create({
        id:group_id,
        product_id,
        isDiscussion: true,
      });
    }else{
      group_id = group.id;
    }
    const message_id = v4();
    const files= await createFiles(request.files('files'),message_id)
    const message = await Message.create({
      id: message_id,
      text,
      group_id,
      files:JSON.stringify(files),
      account_id:access.auth_table_id
    });
    return { ...message.$attributes, id: message_id ,files};
  }

  public async get_messages({ request, auth }: HttpContextContract) {
    let {product_id, limit, page} = paginate(await request.validate({ schema: get_messages_validator }));

    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
    let group = await Group.findBy("product_id", product_id);
    if(!group){
      return []
    }
  
    const messages = await Message.query().select('*').where('account_id',access.auth_table_id).andWhere('group_id',group.id) .limit(limit)
    .offset((page - 1) * limit).orderBy('created_at','desc');
    return messages
  }

  public async get_message({ request, auth }: HttpContextContract) {
    const {message_id} = await request.validate({ schema: get_message_validator });
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
    const message = await Message.find(message_id);
    if(!message) return "ERROR message not found";
    return message
  }

  public async delete_discussion({ request, auth }: HttpContextContract) {
    const {} = await request.validate({ schema: delete_discussions_validator });
    const access = await auth.authenticate();
    if (!access.auth_table_id) return "E_INVALID_API_TOKEN: Invalid API token";
  }
}
