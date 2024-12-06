import { Module } from "@techgrowth-labs/dependency-injection";
import {
	SecretsManagerClientProvider,
	SecretsManagerServiceProvider,
} from "./core/application/secrets-manager/secrets-manager.module";
import {
	EfiAxiosInstanceProvider,
	EfiClientProvider,
} from "./modules/efi/efi.module";

@Module({
	imports: [],
	providers: [
		SecretsManagerClientProvider,
		SecretsManagerServiceProvider,
		EfiClientProvider,
		EfiAxiosInstanceProvider,
	],
})
export class AppModule {}
