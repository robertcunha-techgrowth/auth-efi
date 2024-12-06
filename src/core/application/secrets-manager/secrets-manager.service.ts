import {
	SecretsManagerClient,
	CreateSecretCommand,
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
			Name: "BEARER_EFI",
			Description: "Efi token",
			SecretString: token,
			ForceOverwriteReplicaSecret: true,
		};

		const command = new CreateSecretCommand(input);
		const response = await this.secretsManagerClient.send(command);
		return response as SecretCreateResponse;
	}
}
