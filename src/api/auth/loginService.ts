// loginService.ts
import { UsersType } from "../../Utils/types";
import { getAllUsers } from "../getAllUsers";

const loginService = async (emailInput: string, passwordInput: string) => {
  const users = await getAllUsers(); // assuming this already parses the JSON
  const user = users.find((user: UsersType) => user.email === emailInput && user.password === passwordInput);
  if (user) {
    return user; // simulate a successful login
  } else {
    throw new Error('Invalid credentials');
  }
};

export default loginService;