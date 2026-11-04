import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  product_name: string;
  @Prop({ required: true, min: 0 })
  product_price: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
