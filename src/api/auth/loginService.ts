// loginService.ts
import { showSnackbar } from "../../Redux/snackBarSlice";
import { AppDispatch } from "../../Redux/store";
import { UsersType } from "../../Utils/types";
import { getAllUsers } from "../getAllUsers";

// export const loginService = async (emailInput: string, passwordInput: string, dispatch: AppDispatch): Promise<UsersType | null> => {
//   const users = await getAllUsers();
//   const user = users.find((user: UsersType) => user.email === emailInput && user.password === passwordInput);
//   if (user) {
//     dispatch(showSnackbar({ message: "Login successful", type: "success" }));
//     return user;
//   } else {
//     dispatch(showSnackbar({ message: "Invalid credentials", type: "error" }));
//     return null;
//   }
// };

export const loginService = async (emailInput: string, passwordInput: string, dispatch: AppDispatch): Promise<UsersType | null> => {
  try {
    const users = await getAllUsers();
    const user = users.find((user: UsersType) => user.email === emailInput && user.password === passwordInput);
    if (user) {
      dispatch(showSnackbar({ message: "Login successful", type: "success" }));
      return user;
    } else {
      dispatch(showSnackbar({ message: "Invalid credentials", type: "error" }));
      return null;
    }
  } catch (error) {
    dispatch(showSnackbar({ message: "Failed to connect to server", type: "error" }));
    return null;
  }
};

export default loginService;