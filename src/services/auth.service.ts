import { IUser } from "@/types/user";
import api, { endpoints } from "@/utils/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: IUser;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>(
      endpoints.auth.signIn,
      credentials
    );
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get<IUser>(endpoints.auth.profile);
    return data;
  },
};
