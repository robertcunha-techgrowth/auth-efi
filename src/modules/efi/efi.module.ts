import {
	ClassProvider,
	FactoryProvider,
	Module,
} from "@techgrowth-labs/dependency-injection";
import axios from "axios";
import { EfiClient } from "./efi.client";

export const EfiAxiosInstanceProvider = new FactoryProvider({
	provide: "EfiAxiosInstance",
	useFactory: () => {
		return axios.create({
			baseURL: process.env.EFI_API_URL,
		});
	},
});

export const EfiClientProvider = new ClassProvider({
	provide: "EfiClient",
	useClass: EfiClient,
});

@Module({
	providers: [EfiAxiosInstanceProvider, EfiClientProvider],
	exports: [EfiClientProvider, EfiAxiosInstanceProvider],
})
export class EfiModule {}
