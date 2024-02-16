import type { RequestContract } from "@ioc:Adonis/Core/Request";
import type { ApplicationContract } from "@ioc:Adonis/Core/Application";
import { AsyncLocalStorage } from "async_hooks";

export const RuleAsyncStorage = new AsyncLocalStorage();

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }
  public async boot() {
    const Request = this.app.container.use("Adonis/Core/Request");
    Request.macro(
      "ValidateAndMerge",
      async function ValidateAndMerge(this: RequestContract, validator: any) {
        const merge = { };
        let valid = await new Promise(async (rev) => {
          RuleAsyncStorage.run(merge, async () => {
            const v = await this.validate(validator);
            rev(v);
          });
        }) as Record<string, any>;

        return { ...valid, ...merge };
      }
    );
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
