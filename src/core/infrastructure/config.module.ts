import * as dotenv from "dotenv";

export class ConfigModule {
	static forRoot({ path }: { path: string }) {
		dotenv.config({
			path,
		});
	}
}
