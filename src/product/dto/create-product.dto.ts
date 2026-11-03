import { IsNumber, IsPositive, IsString } from 'class-validator';

export class createProductDto {
  @IsString()
  product_name: string;
  @IsNumber()
  @IsPositive()
  product_price: number;
}
