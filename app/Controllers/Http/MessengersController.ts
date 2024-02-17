import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Discussion from "App/Models/Discussion";
import Message from "App/Models/Message";
import Product from "App/Models/Product";
import { v4 } from "uuid";
import { paginate } from "./Tools/Utils";
import {
  create_discussion_validator,
  delete_discussions_validator,
  get_messages_validator,
  send_message_validator,
} from "App/Validators/MessengerrsValidator";
import { createFiles } from "./Tools/FileManager/CreateFiles";
import { deleteFiles } from "./Tools/FileManager/DeleteFiles";

export default class MessengersController {
  public async get_discussions({ auth }: HttpContextContract) {
    const access = await auth.authenticate();
    const discussions = await Discussion.query()
      .select("*")
      .where("client_id", access.auth_table_id)
      .orWhere("provider_id", access.auth_table_id)
      .orderBy("created_at", "desc");
    return discussions;
  }

  public async create_discussion({ auth, request }: HttpContextContract) {
    const { product_id } = await request.validate(create_discussion_validator);

    const access = await auth.authenticate();
    const discussions = await Discussion.query()
      .where("product_id", product_id)
      .andWhere("client_id", access.auth_table_id)
      .limit(1);
    let discussion = discussions[0];
    if (!discussion) {
      const product = await Product.find(product_id);
      if (!product) return "ERROR product not found";
      const id = v4();
      discussion = await Discussion.create({
        id,
        product_id,
        provider_id: product.account_id,
        client_id: access.auth_table_id,
      });
      discussion.id = id;
    }
    return discussion.$attributes;
  }

  public async send_message({ request, auth }: HttpContextContract) {
    
    const { discussion_id, text } = await request.validate(
      send_message_validator
    );
    const access = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) return"ERROR product not found";
    if(discussion.client_id !==access.auth_table_id && discussion.provider_id !==access.auth_table_id )return "ERROR permission denied" ;

    const message_id = v4();
    const files = await createFiles({
      request,
      column_name:'files',
      table_id:message_id,
      table_name:'messages',
    });
    const message = await Message.create({
      id: message_id,
      text,
      discussion_id,
      files: JSON.stringify(files),
      account_id: access.auth_table_id,
    });
    return { ...message.$attributes, id: message_id, files };
  }
 
  public async get_messages({ request ,auth}: HttpContextContract) {
    let { discussion_id, limit, page } = paginate(
      await request.validate(get_messages_validator)
    );
    const access = await auth.authenticate();
    let discussion = await Discussion.find(discussion_id);
    if (!discussion) {
      return [];
    }
    if(discussion.client_id !==access.auth_table_id && discussion.provider_id !==access.auth_table_id )return "ERROR permission denied" ;

    const query = Message.query()
    .where("discussion_id", discussion_id);
    const total = (await query).length;
    const messages = await query.limit(limit)
      .offset((page - 1) * limit)
      .orderBy("created_at", "desc");
    return {
      total,
      messages
    };
  }

  // public async get_message({ request }: HttpContextContract) {
  //   const { message_id } = await request.validate(get_message_validator);
  //   const message = await Message.find(message_id);
  //   if (!message) return "ERROR message not found";
  //   return message;
  // }

  public async delete_discussion({ request, auth }: HttpContextContract) {
    
    const {discussion_id} = await request.validate(delete_discussions_validator);
    const access = await auth.authenticate();
    
    const discussion = await Discussion.find(discussion_id);
    if(!discussion)return "ERROR discussion not found"
    
    if(discussion.client_id ===access.auth_table_id ) discussion.client_id = null;
    if(discussion.provider_id ===access.auth_table_id ) discussion.provider_id = null;
    
    if(discussion.provider_id ===null && discussion.client_id === null){
      const messages = await Message.query().where("discussion_id", discussion_id)
      messages.forEach(m => {
        deleteFiles(m.id);
      });
      await discussion.delete();

    }
    
    if(!discussion.$isDeleted){
      await discussion.save();
    }

    return {
      deleted:true,
    }
  }
}
