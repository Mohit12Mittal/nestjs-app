import { IsNumber, IsPositive, IsString } from 'class-validator';

export class createUserDTO {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
  @IsNumber()
  @IsPositive()
  age: number;
  @IsString()
  access_token: string;
}
