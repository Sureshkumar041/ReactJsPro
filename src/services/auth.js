import { ApiEndPoints } from "./apiEndPoints";
import BaseService from "./base";

export const LoginService = async (payload) => {
  try {
    const res = await BaseService.post(ApiEndPoints?.login, payload);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};

export const LogoutService = async (payload) => {
  try {
    const res = await BaseService.get(ApiEndPoints?.logout);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};
