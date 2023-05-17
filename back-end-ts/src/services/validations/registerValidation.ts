import BadRequestException from "../../errors/BadRequestException";
import IRegister, { IRegisterValidation } from "../../interfaces/register.interface";
import { newUserSchema } from "./schemas";

export default class RegisterValidation implements IRegisterValidation {
  validateRegister = (user: IRegister) => {
    const { error } = newUserSchema.validate(user);
    if (error) throw new BadRequestException(error.message);
  }
}
