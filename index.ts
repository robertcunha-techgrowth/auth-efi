import { ConfigModule } from "./src/core/infrastructure/config.module";

ConfigModule.forRoot({
	path: ".env",
});
import { AppModule } from "./src/app.module";
import { Handler } from "./src/core/presenter/handler";

const handlerObject = new Handler(AppModule);
export const handler = handlerObject.handler.bind(handlerObject);
