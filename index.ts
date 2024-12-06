import * as loadenv from "./src/core/infrastructure/load-env";
console.log(loadenv);
import { AppModule } from "./src/app.module";
import { Handler } from "./src/core/presenter/handler";

const handlerObject = new Handler(AppModule);
export const handler = handlerObject.handler.bind(handlerObject);
