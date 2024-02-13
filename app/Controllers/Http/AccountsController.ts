import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Account from "App/Models/Account";
import {
  edit_me_validator,
  get_account_from_ids_validator,
  get_account_validator,
  get_all_account_validator,
} from "App/Validators/AccountValidator";
import { paginate } from "./Tools/Utils";

export default class AccountsController {
  public async me({ auth }: HttpContextContract) {
    const account = await Account.getAccountByAuth(auth);
    return Account.formatAccount(account);
  }

  public async edit_me({ auth, request }: HttpContextContract) {
    const attributes = [
      "phone",
      "name",
      "location",
      "avatar_url",
      "use_whatsapp",
    ];
    const body = await request.validate(edit_me_validator);

    const account = await Account.getAccountByAuth(auth);

    attributes.forEach((attribute) => {
      if (body[attribute]) account[attribute] = body[attribute];
    });

    account.save();
    return Account.formatAccount(account);
  }

  public async get_account({ request }: HttpContextContract) {
    const { account_id } = await request.validate(get_account_validator);
    const account = await Account.findOrFail(account_id);

    return Account.formatAccount(account);
  }

  public async get_account_from_ids({ request }: HttpContextContract) {
    const { account_ids } = await request.validate(get_account_from_ids_validator);

    return (await Account.query().whereIn("id", account_ids)).map((account) =>
      Account.formatAccount(account)
    );
  }

  public async get_all_account({ request }: HttpContextContract) {
    let { page, limit } = paginate(
      await request.validate(get_all_account_validator)
    );

    return (
      await Account.query()
        .select("*")
        .limit(limit)
        .offset((page - 1) * limit)
    ).map((account) => Account.formatAccount(account));
  }
}
