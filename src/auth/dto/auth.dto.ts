import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class regisetrUserDTO {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
  @IsNumber()
  @IsPositive()
  age: number;
  @IsString()
  password: string;
}

export class loginUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class updateUserDto {
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
  @IsNumber()
  @IsPositive()
  age: number;
}

export class changeStatusDto {
  @IsBoolean()
  isActive: boolean;
}
