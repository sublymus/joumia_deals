import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from "@ioc:Adonis/Core/Validator";
import { parentList } from "App/Controllers/Http/Tools/CategoriesUtil";
import { RuleAsyncStorage } from "../../providers/AppProvider";
import { BaseModel } from "@ioc:Adonis/Lucid/Orm";

export type CaracteristiqueJonInfo = {
  currentModel: typeof BaseModel;
  caracteristiqueModel: typeof BaseModel;
  caracteristiqueModel_id_field: string;
  caracteristique_description_field: string;
};

type FieldOptions = {
  type: "string" | "number" | "boolean" | "date" | "file";
  name: string;
  field: string;
  icon?: string;
  placeholder?: string;
  require?: boolean;
  default?: string;
  match?: [string, string]; // regexString, i
  enum?: string[] | number[];
  min?: number;
  max?: number;
  maxSize?: number;
  mime?: (string | [string, number])[];
}[];

function isDate(a: any): a is string {
  try {
    if (typeof a == "string") {
      const date = Date.parse(a);
      if (Number.isNaN(date)) return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}

validator.rule(
  "caracteristiqueJson",
  async (_v, [info]: [CaracteristiqueJonInfo], options) => {
    const { root, field } = options;
    const {
      caracteristiqueModel_id_field,
      currentModel,
    } = info;
    let caracteristique: { [k: string]: string | number } = {};

    try {
      caracteristique = JSON.parse(root[field]);
      const merge = RuleAsyncStorage.getStore() as Record<string,any>
      merge[field] = caracteristique;

      let caract_model_id: string = "";

      if (root[caracteristiqueModel_id_field]) {
        caract_model_id = root[caracteristiqueModel_id_field];
      } else if (root.id) {
        const model = await currentModel.find(root.id);
        caract_model_id = model?.[caracteristiqueModel_id_field] || "";
      }

      const categories = await parentList(caract_model_id);
      if (!categories || categories.length <= 0) {
        throw new Error(`ERROR  ${caracteristiqueModel_id_field}:${caract_model_id}  not found`);
      }

      const fields: FieldOptions = categories
        ?.map((c) => {
          try {
            const filed = JSON.parse(c.caracteristique_field);
            if (!Array.isArray(filed)) return [];
            return filed;
          } catch (error) {
            return [];
          }
        })
        .flat(1);

      validFields(fields, caracteristique, root.caracteristique_files);
    } catch (error) {
      console.error(error.message);

      return;
    }
  },
  () => ({
    allowUndefineds: true,
  })
);

function getArrayJSON(value: any) {
  try {
    const v = JSON.parse(value);
    return Array.isArray(v) ? v : null;
  } catch (error) {
    return null;
  }
}

function validField(
  rule: FieldOptions[0],
  caracteristique: { [k: string]: string | number },
  _caracteristique_files: ReturnType<HttpContextContract["request"]["files"]>
) {
  let value = caracteristique[rule.name];
  //   console.log({ value, name: rule.name, type: rule.type });

  if (value != undefined) {
    if (rule.type == "string") {
      if (typeof value !== "string")
        throw new Error(
          `'ERROR caracteristique.${rule.name} must be a string value`
        );
      else {
        if (rule.enum && !(rule.enum as string[]).includes(value))
          throw new Error(`ERROR ${rule.name}:${value}, is not in Enumeration`);
        if (rule.max && value.length > rule.max)
          throw new Error(
            `ERROR ${rule.name}:${value},  must be a value between [${
              rule.min ?? 0
            } , ${rule.max} ]`
          );
        if (rule.min && value.length < rule.min)
          throw new Error(
            `ERROR ${rule.name}:${value},  must be a value > ${rule.min}`
          );
        if (rule.match && !new RegExp(rule.match[0], rule.match[1]).test(value))
          throw new Error(
            `ERROR ${rule.name}:${value},  regExp no match : ${rule.match}`
          );
      }
    } else if (rule.type == "number") {
      if (typeof value !== "number")
        throw new Error(
          `'ERROR caracteristique.${rule.name} must be a number value`
        );
      else {
        if (rule.enum && !(rule.enum as number[]).includes(value))
          throw new Error(`ERROR ${rule.name}:${value}, is not in Enumeration`);
        if (rule.max && value > rule.max)
          throw new Error(
            `ERROR ${rule.name}:${value},  must be a value between [${
              rule.min ?? 0
            } , ${rule.max} ]`
          );
        if (rule.min && value < rule.min)
          throw new Error(
            `ERROR ${rule.name}:${value},  must be a value > ${rule.min}`
          );
      }
    } else if (rule.type == "date") {
      if (!isDate(value))
        throw new Error(
          `'ERROR caracteristique.${rule.name} must be a Date value, like "yyyy-mm-dd"`
        );
      else {
        if (rule.enum && !(rule.enum as string[]).includes(value))
          throw new Error(`ERROR ${rule.name}:${value}, is not in Enumeration`);
        if (rule.max && new Date(value) > new Date(rule.max))
          throw new Error(
            `ERROR ${rule.name}:${value},  must be a value between [${new Date(
              rule.min ?? 0
            ).toDateString()} , ${new Date(rule.max).toDateString()} ]`
          );
        if (rule.min && new Date(value) < new Date(rule.min))
          throw new Error(
            `ERROR ${rule.name}:${value},  must be a value > ${new Date(
              rule.min
            ).toDateString()}`
          );
      }
    } else if (rule.type == "boolean") {
      if (typeof value !== "boolean")
        throw new Error(
          `'ERROR caracteristique.${rule.name} must be a boolean value`
        );
    } else if (rule.type == "file") {
      const v = getArrayJSON(value);
      if (!v)
        throw new Error(
          `ERROR ${rule.name}:${value},  must be an Array like : ['carateristique_files.n',..] where n is index number`
        );
    }
  } else {
    if (rule.require == true) throw new Error("ERROR require " + rule.name);
  }
}
function validFields(
  fields: FieldOptions,
  caracteristique: { [k: string]: string | number },
  caracteristique_files: ReturnType<HttpContextContract["request"]["files"]>
) {
  for (const rule of fields) {
    validField(rule, caracteristique, caracteristique_files);
  }
}
