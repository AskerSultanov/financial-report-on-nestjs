import { Document } from 'mongoose';

export interface IUser extends Document {
  role: string;
  login: string;
  userId: string;
  passwd: string;
  registeredAt: Date;
}
