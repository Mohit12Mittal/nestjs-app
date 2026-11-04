import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String, trim: true })
  name: string;
  @Prop({ required: true, trim: true, type: String, unique: true })
  email: string;
  @Prop({ required: true, type: String, trim: true })
  phone: string;
  @Prop({ required: true, trim: true, type: String })
  password: string;
  @Prop({ type: String, trim: true })
  address: string;
  @Prop({ required: true, type: Number, default: null })
  age: number;
  @Prop({ type: String, required: false })
  access_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
