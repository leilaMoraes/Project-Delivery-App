import { ILogin } from "./login.interface";

export default interface IRegister extends ILogin {
  name: string;
  role?: string;
}

export interface IRegisterValidation {
  validateRegister: (u: IRegister) => void
}