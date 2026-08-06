import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  schemaVersion!: string;

  @Prop({ required: true })
  login!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  passwd!: string;

  @Prop({ required: true })
  registeredAt!: Date;

  @Prop({ required: true, default: 'user', enum: ['user', 'admin'] })
  role!: string;
}

export var UsersSchema = SchemaFactory.createForClass(Users);
