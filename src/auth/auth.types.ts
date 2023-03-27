import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

import { User } from 'auth/auth.model';

export class ApiRequest {
  user: User;
  headers: Headers & {
    authorization: string;
  };
}

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
