import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import {
	ClassProvider,
	FactoryProvider,
	Module,
} from "@techgrowth-labs/dependency-injection";
import { SecretsManagerService } from "./secrets-manager.service";

export const SecretsManagerClientProvider = new FactoryProvider({
	provide: "SecretsManagerClient",
	useFactory: () => {
		return new SecretsManagerClient({
			region: process.env.AWS_REGION_SSM,
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID_SSM as string,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SSM as string,
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
