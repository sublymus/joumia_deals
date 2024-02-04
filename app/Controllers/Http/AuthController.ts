import { OpaqueTokenContract } from "@ioc:Adonis/Addons/Auth";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AccessOauth from "App/Models/AccessOauth";
import Account from "App/Models/Account";
import Acl from "App/Models/Acl";

export default class AuthController {
  public async google_connexion({ ally }: HttpContextContract) {
    console.log("google_connexion");
    return ally.use("google").redirect();
  }

  public async deconnexion({ auth }: HttpContextContract) {
    console.log("deconnexion");
    auth.use("api").revoke();
    return {
      connexion: false,
    };
  }

  public async google_push_info({ ally, auth }: HttpContextContract) {
    return this.pusf_info({ ally, auth }, "google", "home", "create_user");
  }

  private async pusf_info(
    {
      ally,
      auth,
    }: { ally: HttpContextContract["ally"]; auth: HttpContextContract["auth"] },
    providerName: string,
    homePage: string,
    createUserPage: string
  ) {
    const provider = ally.use("google");

    if (provider.accessDenied()) {
      return providerName + " access was denied";
    }
    if (provider.stateMisMatch()) {
      return providerName + " request expired. Retry again";
    }
    if (provider.hasError()) {
      return provider.getError();
    }
    const { id, email, avatarUrl, name } = await provider.user();
    if (!email) {
      return providerName + " request user email";
    }
    const access = await AccessOauth.findBy("oauth_client_unique", email);
    if (access) {
      if (access.auth_table_id && access.auth_table_name) {
        const account = await Account.find(access.auth_table_id);
        if (!account) {
          access.delete();
          return (
            "ERROR Account not found, new " +
            providerName +
            " connexion required"
          );
        }
        return {
          page: homePage,
          send: {
            token: await auth
              .use("api")
              .attempt(access.oauth_client_unique, access.original_id),
            phone: account.phone,
            location: account.location,
            name: account.name,
            email: account.email,
            avatarUrl: account.avatar_url,
          },
        } satisfies PushReturnType;
      } else {
        return {
          page: createUserPage,
          send: {
            phone: null,
            location: null,
            name: name,
            email,
            avatarUrl,
            oauth_client_id: access.password,
            oauth_provider_name: access.oauth_provider_name,
          },
        } satisfies PushReturnType;
      }
    }
    const acces_oauth = await AccessOauth.create({
      password: id,
      oauth_client_unique: email,
      oauth_provider_name: providerName,
      original_id: id,
    });
    return {
      page: createUserPage,
      send: {
        phone: null,
        location: null,
        name: name,
        email,
        avatarUrl,
        oauth_client_id: acces_oauth.password,
        oauth_provider_name: acces_oauth.$attributes.oauth_provider_name,
      },
    } satisfies PushReturnType;
  }

  public async create_user({ request, auth }: HttpContextContract) {
    const {
      phone,
      name,
      avatarUrl,
      location,
      email,
      oauth_client_id,
      oauth_provider_name,
    } = request.all();

    if (
      !name ||
      !phone ||
      !location ||
      !oauth_provider_name ||
      !oauth_client_id ||
      !email
    ) {
      return `ERROR the following properties are required : 'phone',
      'client_name',
      'location',
      'email',
      'oauth_provider_name'`;
    }
    const myAccess = (
      await AccessOauth.query()
        .where("oauth_provider_name", oauth_provider_name)
        .andWhere("password", oauth_client_id)
        .andWhere("oauth_client_unique", email)
        .limit(1)
    )[0];
    if (!myAccess) {
      return "ERROR " + oauth_provider_name + " _connexion must be call before";
    }

    let account: Account | null;

    if (myAccess.auth_table_id && myAccess.auth_table_name) {
      account = await Account.find(myAccess.auth_table_id);
      if (!account) {
        myAccess.delete();
        return "ERROR Account not found, new connexion required";
      }
    } else {
      await Account.create({
        name,
        phone,
        avatar_url: avatarUrl,
        email,
        location,
        access_id: myAccess.id,
      });
      account = await Account.findBy("email", email);
      if (!account) {
        myAccess.delete();
        return "ERROR Account not created, new connexion required";
      }
      /*
      myAccess.auth_table_id = account.id
      myAccess.auth_table_name = "accounts"
      myAccess.save()
      */
      await AccessOauth.query()
        .where("id", myAccess.id)
        .update({ auth_table_name: "accounts", auth_table_id: account.id });
    }

    return {
      page: "home",
      send: {
        ...account.$attributes,
        token: await auth
          .use("api")
          .attempt(myAccess.oauth_client_unique, myAccess.original_id),
      },
    };
  }
}

type PushReturnType = {
  page: string;
  send: {
    phone: string | null;
    location: string | null;
    name: string;
    email: string;
    avatarUrl: string | null;
    oauth_client_id?: string;
    oauth_provider_name?: string;
    token?: OpaqueTokenContract<AccessOauth>;
  };
};
