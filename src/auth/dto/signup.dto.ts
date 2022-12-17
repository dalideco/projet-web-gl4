import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingupUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}