declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        caracteristiqueJson(body:Record<string, any>): Rule
        toJSON(): Rule
        flleList(): Rule
        existOntable(id:string,info:[string,string?]): Rule
    }
  }

  