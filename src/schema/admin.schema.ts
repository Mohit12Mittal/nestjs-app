import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, trim: true, unique: true, type: String })
  email: string;
  @Prop({ required: true, trim: true, type: String })
  password: string;
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
  @Prop({ type: Boolean, default: false })
  isDelete: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
