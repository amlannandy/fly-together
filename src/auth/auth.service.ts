import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.model';
import { RegisterBody } from './auth.types';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(body: RegisterBody): Promise<User> {
    const user = new this.userModel(body);
    return user.save();
  }
}
