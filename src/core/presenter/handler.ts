import { TechgrowthLabsLambdaHandler } from "@techgrowth-labs/dependency-injection";
import { AppModule } from "../../app.module";
import { EfiClient } from "../../modules/efi/efi.client";
import { SecretsManagerService } from "../application/secrets-manager/secrets-manager.service";

export class Handler extends TechgrowthLabsLambdaHandler {
	override async handler(event: any, context: any): Promise<any> {
		const providers = this.getProviders(AppModule.name);

		const efiClient: EfiClient = providers.EfiClient;
		const secretsManagerService: SecretsManagerService =
			providers.SecretsManagerService;

		const responseEfi = await efiClient.getToken();
		await secretsManagerService.createToken(responseEfi.access_token);
		return {
			status: 200,
		};
	}
}
