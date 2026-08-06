import { IUser } from '../../../interfaces/users.interface.js';

export async function getUserByUserId(
  this: any,
  userId: string,
): Promise<IUser> {
  return await this.usersModel.findOne({ userId });
}
