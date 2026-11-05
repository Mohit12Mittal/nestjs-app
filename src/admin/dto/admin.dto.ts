import { IsString } from 'class-validator';

export class registerAdminDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
export class loginAdminDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
