import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Account from "App/Models/Account";

export default class AccountsController {
  public async me({ auth }: HttpContextContract) {
    const account = await Account.getAccountByAuth(auth);
    if (!account) {
      return "ERROR CONNEXION REQUIRED";
    }
    return Account.formatAccount(account)
  }

  public async edit_me({ auth, request }: HttpContextContract) {
    const attributes = ["phone", "name", "location", "avatar_url"];
    const body = request.body();

    const account = await Account.getAccountByAuth(auth);
    if (!account) {
      return "ERROR CONNEXION REQUIRED";
    }
    attributes.forEach((attribute) => {
      if (body[attribute]) account[attribute] = body[attribute];
    });
    
    account.save();
    return Account.formatAccount(account)
  }

  public async get_account({ request }: HttpContextContract) {
    const { id } = request.body();
    const account = await Account.findOrFail(id);
    if (!account) {
      return "ERROR CONNEXION REQUIRED";
    }
    return Account.formatAccount(account)
  }

  public async get_account_from_ids({ request }: HttpContextContract) {
    const { ids } = request.body();
    if (!Array.isArray(ids)) return 'ERROR required => "ids:uuid[]"';

    return {
      ...(await Account.query().whereIn("id", ids)).map((account) =>  Account.formatAccount(account)),
    };
  }

  public async get_all_account({ request }: HttpContextContract) {
    let { page, limit } = request.body();
    if (page < 1) return " page must be between [1 ,n] ";
    if (limit < 1) return " limite must be between [1 ,n] ";
    page = page??1;
    limit = limit??25
    return {
      ...(await Account.query().select('*').limit(limit).offset((page-1)*limit)).map((account) =>  Account.formatAccount(account)),
    };
  }
}
