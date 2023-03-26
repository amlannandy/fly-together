import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'auth/auth.model';
import { LoginBody, RegisterBody } from 'auth/auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(body: RegisterBody): Promise<string> {
    const user = new this.userModel(body);
    await user.save();
    const token = user.getJwtToken(this.jwtService);
    return token;
  }

  async authenticate(body: LoginBody): Promise<string> {
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
    const token = user.getJwtToken(this.jwtService);
    return token;
  }
}
