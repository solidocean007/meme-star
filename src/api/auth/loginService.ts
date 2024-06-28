// loginService.ts
import { showSnackbar } from "../../Redux/snackBarSlice";
import { AppDispatch } from "../../Redux/store";
import { UsersType } from "../../Utils/types";
import { getAllUsers } from "../getAllUsers";

export const loginService = async (emailInput: string, passwordInput: string, dispatch: AppDispatch): Promise<UsersType | null> => {
  const users = await getAllUsers(); // assuming this already parses the JSON
  const user = users.find((user: UsersType) => user.email === emailInput && user.password === passwordInput);
  if (user) {
    dispatch(showSnackbar({ message: "Login successful", type: "success" }));
    return user; // simulate a successful login
  } else {
    dispatch(showSnackbar({ message: "Invalid credentials", type: "error" }));
    return null;
  }
};

export default loginService;