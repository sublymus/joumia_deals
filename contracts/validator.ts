import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { CaracteristiqueJonInfo } from "App/Rules/caracteristiqueJSON";

declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        caracteristiqueJson(info:CaracteristiqueJonInfo): Rule
        toJSON(): Rule
        flleList(): Rule
        existOntable(id:string,info:[string,string?]): Rule
    }
  }

  