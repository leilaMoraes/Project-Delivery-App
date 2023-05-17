import { ILogin } from './login.interface';

export default interface IServiceLogin {
  login(l: ILogin): Promise<{ user: {id: number, email: string, name: string, role: string}, token: string }>,
}
