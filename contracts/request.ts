// import type { HttpContextContract ,RequestContract} from "@ioc:Adonis/Core/Request";

declare module "@ioc:Adonis/Core/Request" {
    interface RequestContract{
        ValidateAndMerge : RequestContract['validate'],
        mergebale:Record<string,any>
    }
  }

  