import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import {
	ClassProvider,
	FactoryProvider,
	Module,
} from "@techgrowth-labs/dependency-injection";
import { SecretsManagerService } from "./secrets-manager.service";
import * as dotenv from "dotenv";

export const SecretsManagerClientProvider = new FactoryProvider({
	provide: "SecretsManagerClient",
	useFactory: () => {
		dotenv.config();
		return new SecretsManagerClient({
			region: process.env.AWS_REGION,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
			},
		});
	},
});

export const SecretsManagerServiceProvider = new ClassProvider({
	provide: "SecretsManagerService",
	useClass: SecretsManagerService,
});

@Module({
	imports: [],
	providers: [SecretsManagerClientProvider, SecretsManagerServiceProvider],
	exports: [SecretsManagerServiceProvider],
})
export class SecretsManagerModule {}
