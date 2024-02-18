import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Account from "App/Models/Account";
import Vote from "App/Models/Vote";

export default class VoteController {
  public async vote_account({ auth, request }: HttpContextContract) {
    const { account_id, star } = request.body();
    const access = await auth.authenticate();

    const account = await Account.find(account_id);

    if (!account) return "ERROR account not found";

    if (account_id == access.auth_table_id) {
      return "ERROR another account is required";
    }

    const discussion = await Database.query()
      .from("discussions")
      .where("provider_id", account_id)
      .andWhere("client_id", access.auth_table_id)
      .limit(1);
    if (discussion.length > 0) {
      const last_votes = await Database.query()
        .from("votes")
        .where("provider_account_id", account_id)
        .andWhere("client_account_id", access.auth_table_id)
        .limit(1);
      if (last_votes.length == 0) {
        await Vote.create({
          star,
          client_account_id: access.auth_table_id,
          provider_account_id: account_id,
        });
      }
    } else {
      return "ERROR discussion with account required";
    }

    const votes = await Database.from((sub) => {
      sub
        .from("votes")
        .count("id", "votes")
        .avg("star", "star")
        .where("provider_account_id", account_id)
        .groupBy("id");
    })
      .sum("votes", "votes")
      .avg("star", "star");
    return votes[0];
  }
  public async get_account_votes({ request }: HttpContextContract) {
    const { account_id } = request.body();
    const votes = await Database.from((sub) => {
      sub
        .from("votes")
        .count("id", "votes")
        .avg("star", "star")
        .where("provider_account_id", account_id)
        .groupBy("id");
    })
      .sum("votes", "votes")
      .avg("star", "star");
    return {
      votes: votes[0],
    };
  }
}
