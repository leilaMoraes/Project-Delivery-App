import UnauthorizedExeception from '../../errors/UnauthorizedExeception';
import BadRequestException from '../../errors/BadRequestException';
import { ILoginValidation, ILogin } from '../../interfaces/login.interface';
import { loginSchema } from './schemas';

export default class LoginValidation implements ILoginValidation {
  validateLogin = (login: ILogin) => {
    const { error } = loginSchema.validate(login);
    if (error) throw new BadRequestException(error.message);
  };
}
