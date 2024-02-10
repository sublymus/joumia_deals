import { rules, schema, validator } from "@ioc:Adonis/Core/Validator";
import CategoriesController from "App/Controllers/Http/CategoriesController";
console.log("##");

type FieldOptions = {
  type: "string" | "number" | "boolean" | "date" | "files";
  name: string;
  field: string;
  placeholder?: string;
  icon: string;
  require?: boolean;
  default?: string;
  match?: [string, string]; // regexString, i
  enum?: string[] | number[];
  min?: number;
  max?: number;
  maxSize?: number;
  mime?: (string | [string, number])[];
}[];

function isString(a: any): a is Array<string> {
  return typeof a?.[0] == "string";
}
function isNumber(a: Array<any>): a is Array<number> {
  return typeof a?.[0] == "number";
}
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
validator.rule("caracteristiqueJson", async (value, o, options) => {
  console.log({ value, o, root: options.root });

  const { root } = options;

  let caracteristique: { [k: string]: string | number } = {};
  try {
    caracteristique = JSON.parse(root.caracteristique);

    const categories = await CategoriesController.parentList(root.category_id);

    if (!categories || categories.length <= 0) {
      console.log("@@@@@@@@@", categories);
      throw new Error("category_id not found");
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

    console.log("##########", fields.length);

    validFields(fields, caracteristique);
  } catch (error) {
    console.error(error.message);

    return options.errorReporter.report(
      options.pointer,
      "caracteristiqueJson.json",
      error.message
    );
  }
});
validator.rule("json", async (value, o, options) => {
  const { root } = options;

  try {
    JSON.parse(root.caracteristique);
  } catch (error) {}

  // // Rest of the validation
  // if (maxLength && value.length > maxLength) {
  //   options.errorReporter.report(
  //     options.pointer,
  //     'camelCase.maxLength', // 👈 Keep an eye on this
  //     'camelCase.maxLength validation failed',
  //     options.arrayExpressionPointer,
  //     { maxLength }
  //   )
  // }
});

function validField(
  rule: FieldOptions[0],
  caracteristique: { [k: string]: string | number }
) {
  let value = caracteristique[rule.name];
  console.log({ value, name: rule.name, type: rule.type });

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
        if (rule.match && new RegExp(rule.match[0], rule.match[1]).test(value))
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
    } else if (rule.type == "boolean" && typeof value !== "boolean")
      throw new Error(
        `'ERROR caracteristique.${rule.name} must be a boolean value`
      );
  } else {
    if (rule.require == true) throw new Error("ERROR require " + rule.name);
  }
}
function validFields(
  fields: FieldOptions,
  caracteristique: { [k: string]: string | number }
) {
  for (const rule of fields) {
    validField(rule, caracteristique);
  }
}
