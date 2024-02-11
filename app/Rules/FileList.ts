import { validator } from "@ioc:Adonis/Core/Validator";

validator.rule("flleList", async (value, _, options) => {
    const { root, mutate } = options;

    try {
     const fileList =   JSON.parse(value);
     console.log({fileList});
     
     if(Array.isArray(fileList)){
        options.mutate(fileList);
        root.photos = fileList
     }
    } catch (error) {}
  
  },() => ({
    allowUndefineds: true,
    async: true,
  }));
  