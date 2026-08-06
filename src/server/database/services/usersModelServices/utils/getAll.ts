import { Users } from '../../../schemas/users.schema.js';

export async function getAll(this: any): Promise<Users> {
  return await this.usersModel.find({}, { _id: 0, passwd: 0 });
}
