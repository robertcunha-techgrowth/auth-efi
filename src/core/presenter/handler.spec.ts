import {
	TechgrowthLabsLambdaHandler,
	TestModule,
} from "@techgrowth-labs/dependency-injection";
import { AppModule } from "../../app.module";
import { AxiosInstance } from "axios";
import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Handler } from "./handler";

describe("Handler", () => {
	let module: TestModule;
	let efiAxiosInstance: AxiosInstance;
	let secretsManagerClient: SecretsManagerClient;
	let handler: TechgrowthLabsLambdaHandler;

	beforeAll(() => {
		module = new TestModule(AppModule);
		handler = new Handler(module);

		efiAxiosInstance = module.get<AxiosInstance>(
			AppModule.name,
			"EfiAxiosInstance"
		);

		secretsManagerClient = module.get<SecretsManagerClient>(
			AppModule.name,
			"SecretsManagerClient"
		);

		jest.spyOn(efiAxiosInstance, "post").mockResolvedValue({
			data: {
				access_token: "BLA BLA BLA",
				token_type: "Bearer",
				expires_in: 3600,
				scope: "read",
			},
		});

		jest.spyOn(secretsManagerClient as any, "send").mockResolvedValue({});
	});
	describe("handler", () => {
		it("should save secret and return 200", async () => {
			const response = await handler.handler(null, null);
			expect(response.status).toBe(200);
		});
	});
});
