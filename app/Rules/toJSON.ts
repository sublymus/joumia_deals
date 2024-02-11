import { rules, schema, validator } from "@ioc:Adonis/Core/Validator";



validator.rule("toJSON", async (value, o, options) => {
    const { root } = options;
  
    try {
      JSON.parse(root.caracteristique);
    } catch (error) {}
  
  
  });
  