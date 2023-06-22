import { AuthResponse } from "../types/auth.type";
import httpRequest from "../utils/https";

const authApi = {
  registerAccount: (body: { email: string; password: string }) =>
    httpRequest.post<AuthResponse>("register", body),
  loginAccount: (body: { email: string; password: string }) =>
    httpRequest.post<AuthResponse>("login", body),
  logoutAccount: () => httpRequest.post<AuthResponse>("logout"),
};
export default authApi;
