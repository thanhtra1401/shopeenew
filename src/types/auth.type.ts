import { User } from "./user.type";
import { SuccessResponseApi } from "./utils.type.ts";

export interface data {
  loading: boolean;
  access_token: string;
  refresh_token: string;
  expires: string;
  expires_refresh_token: string;
  user: User | null;
}

export type AuthResponse = SuccessResponseApi<data>;
