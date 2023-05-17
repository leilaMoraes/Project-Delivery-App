import StatusCodes from '../utils/statusCode';
import IRegister from './register.interface';

export default interface IServiceRegister {
  register(l: IRegister): Promise<{ user: { id: number, email: string, name: string, role: string }, token: string }>,
}
