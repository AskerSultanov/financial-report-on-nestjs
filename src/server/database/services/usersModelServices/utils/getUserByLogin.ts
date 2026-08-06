import { IUser } from '../../../interfaces/users.interface.js';

interface Models {
  usersModel: any;
}

export async function getUserByLogin(
  this: Models,
  login: string,
): Promise<IUser | null> {
  return await this.usersModel.findOne({ login });
}
