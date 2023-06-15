// import axios from "axios";

// const http = axios.create({
//   baseURL: "https://api-ecom.duthanhduoc.com/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });

// export default http;

import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { clearLS, getLS, setLS } from ".";
import { AuthResponse } from "../types/auth.type";
import { toast } from "react-toastify";

class Http {
  instance: AxiosInstance;
  private accessToken: string | null;
  constructor() {
    this.accessToken = getLS("access_token");
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 10000, // 10 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "login" || url === "register") {
          const data = (response.data as AuthResponse).data;
          this.accessToken = data.access_token as string;

          setLS("access_token", this.accessToken);
          //saveProfile(data.user);
        } else if (url === "logout") {
          this.accessToken = "";
          clearLS("access_token");
        }
        return response;
      },
      (error) => {
        if (error.response.status === 422) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message, {
            toastId: "error",
          });
        }

        if (error.response.status === HttpStatusCode.Unauthorized) {
          clearLS("access_token");
        }

        return Promise.reject(error);
      }
    );
  }
}

const httpRequest = new Http().instance;

export default httpRequest;
