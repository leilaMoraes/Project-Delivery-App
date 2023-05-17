import User from "../database/models/User";
import IRegister from "./register.interface";

export default interface IServiceAdmin {
  getUsers: () => Promise<User[]>;
  createUser: (u: IRegister) => Promise<{ id: number, email: string, name: string, role: string, token: string }>;
  deleteUser: (id: string) => Promise<void>;
}