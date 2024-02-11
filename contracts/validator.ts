declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        caracteristiqueJson(): Rule
        toJSON(): Rule
        flleList(): Rule
    }
  }

  