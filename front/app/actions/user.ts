import { AxiosResponse } from "axios";
import { api } from "../../lib/api";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export const getUserInfo = (): Promise<AxiosResponse<User>> => {
  return api.get("/users/me");
};
