
import { validator } from "@ioc:Adonis/Core/Validator";
import { RuleAsyncStorage } from "../../providers/AppProvider";


validator.rule("toJSON", async (_v, _, options) => {
    const { root,field } = options;
   const merge = RuleAsyncStorage.getStore()as Record<string, any>;
    try {
      merge[field] = JSON.parse(root[field]);
      return
    } catch (error) {
      console.log(error);
      options.errorReporter.report(
        options.pointer,
        "caracteristiqueJson.json",
        error.message
      );
    }
  
  
  });
   