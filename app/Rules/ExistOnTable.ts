import { validator } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";

validator.rule("existOnTable", async (id:string, [table, column]:[string,string]) => {
    if(!column) column = 'id';
    if (table) {
      const model = (await Database.query().from(table).where(column,id))[0];
      if (!model) return "ERROR category not found";
    }
  });
  