import { AppModule } from "./src/app.module";
import { ConfigModule } from "./src/core/infrastructure/config.module";
import { Handler } from "./src/core/presenter/handler";

ConfigModule.forRoot({ path: ".env" });

const handlerObject = new Handler(AppModule);
export const handler = handlerObject.handler.bind(handlerObject);
