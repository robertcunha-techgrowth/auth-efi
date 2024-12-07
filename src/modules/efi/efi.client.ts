import https from "https";
import { AxiosInstance } from "axios";
import fs from "fs";
import { Inject, Injectable } from "@techgrowth-labs/dependency-injection";

export interface AuthResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
}

@Injectable()
export class EfiClient {
	constructor(
		@Inject("EfiAxiosInstance")
		private readonly efiAxiosInstance: AxiosInstance
	) {}

	async getToken() {
		const certificado = fs.readFileSync(
			process.env.EFI_CERTIFICATE_PATH as string
		);

		const credenciais = {
			client_id: process.env.EFI_CLIENT_ID,
			client_secret: process.env.EFI_SECRET_ID,
		};

		const data = JSON.stringify({ grant_type: "client_credentials" });
		const data_credentials =
			credenciais.client_id + ":" + credenciais.client_secret;

		const auth = Buffer.from(data_credentials).toString("base64");

		const agent = new https.Agent({
			pfx: certificado,
			passphrase: "",
		});

		const response = await this.efiAxiosInstance.post("/oauth/token", data, {
			httpsAgent: agent,
			headers: {
				Authorization: "Basic " + auth,
				"Content-Type": "application/json",
			},
		});

		return response.data as AuthResponse;
	}
}
