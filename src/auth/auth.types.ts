import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class RegisterBody {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  phone: string;
}

export class LoginBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
