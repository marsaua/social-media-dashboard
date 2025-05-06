import { SetMetadata } from "@nestjs/common";

export const PUBLIC_ENDPOINT_KEY = "publicEndpoint";

export const PublicEndpoint = () => SetMetadata(PUBLIC_ENDPOINT_KEY, true);
