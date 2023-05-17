import User from "../database/models/User";

export default interface IServiceSeller {
  getAll(): Promise<User[]>,
}
