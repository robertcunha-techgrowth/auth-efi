import {
	SecretsManagerClient,
	CreateSecretCommand,
	UpdateSecretCommand,
} from "@aws-sdk/client-secrets-manager"; // ES Modules import
import { Inject, Injectable } from "@techgrowth-labs/dependency-injection";

export interface SecretCreateResponse {
	ARN: string;
	Name: string;
	VersionId: string;
}

@Injectable()
export class SecretsManagerService {
	constructor(
		@Inject("SecretsManagerClient")
		private readonly secretsManagerClient: SecretsManagerClient
	) {}

	async createToken(token: string): Promise<SecretCreateResponse> {
		const input = {
			SecretId: "BEARER_EFI",
			Description: "EFI Token",
			SecretString: token,
		};

		const command = new UpdateSecretCommand(input);
		const response = await this.secretsManagerClient.send(command);
		return response as SecretCreateResponse;
	}
}
