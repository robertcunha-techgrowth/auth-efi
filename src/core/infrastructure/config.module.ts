import * as dotenv from "dotenv";

export class ConfigModule {
	static forRoot(configOptions?: dotenv.DotenvConfigOptions) {
		dotenv.config(configOptions);
	}
}
