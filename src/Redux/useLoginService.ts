import { UsersType } from "../Utils/types";
import loginService from "../api/auth/loginService";
import { useAppDispatch } from "./hook";

export const useLoginService = () => {
  const dispatch = useAppDispatch();

  const userLogin = async (emailInput: string, passwordInput: string): Promise<UsersType | null> => {
    return await loginService(emailInput, passwordInput, dispatch);
  };

  return userLogin;
};