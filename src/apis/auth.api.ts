import { AuthResponse } from "../types/auth.type";
import httpRequest from "../utils/https";

export const registerAccount = (body: { email: string; password: string }) =>
  httpRequest.post<AuthResponse>("register", body);
export const loginAccount = (body: { email: string; password: string }) =>
  httpRequest.post<AuthResponse>("login", body);
export const logoutAccount = () => httpRequest.post<AuthResponse>("logout");
