import { AxiosResponse } from "axios";
import { api } from "../../lib/api";

interface SignInResponse {
  access_token: string;
}

export const signIn = async (
  email: string,
  password: string
): Promise<AxiosResponse<SignInResponse>> => {
  return api.post("auth/login", {
    email,
    password,
  });
};
