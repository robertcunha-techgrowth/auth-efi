import { AppModule } from "./src/app.module";
import { ConfigModule } from "./src/core/infrastructure/config.module";
import { Handler } from "./src/core/presenter/handler";

ConfigModule.forRoot({ path: ".env" });

const handler = new Handler(AppModule);
export const handlerFunction = handler.handler.bind(handler);
