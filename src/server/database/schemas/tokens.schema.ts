import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ encryptionType: 'queryableEncryption' })
export class Token {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: false })
  lastUsed?: Date;

  @Prop({ required: false, default: '' })
  token!: string;

  @Prop({ required: false, default: false })
  tokenHasBeenRemoved!: boolean;
}

export var TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.index({ userId: 1 }, { unique: true });
