import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'auth/auth.model';
import { LoginBody, RegisterBody } from 'auth/auth.types';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(body: RegisterBody): Promise<User> {
    const user = new this.userModel(body);
    return user.save();
  }

  async authenticate(body: LoginBody): Promise<User> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email }).select('+password');
    // User with that email does not exist
    if (!user) {
      throw new HttpException(
        'User with this email address does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const authResult = await user.matchPassword(password);
    if (!authResult) {
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
