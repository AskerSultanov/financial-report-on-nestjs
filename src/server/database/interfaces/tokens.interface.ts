import { Document } from 'mongoose';

export interface IToken extends Document {
  readonly userId: string;
  readonly lastUsed: Date;
  readonly token: string;
  readonly tokenHasBeenRemoved: boolean;
  readonly schemaVersion: number;
}
