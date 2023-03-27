import { HttpStatus, Injectable, NestMiddleware, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response, NextFunction } from 'express';
import { Model } from 'mongoose';

import { User, UserDocument } from 'auth/auth.model';
import { ApiRequest } from 'auth/auth.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async use(@Req() req: ApiRequest, res: Response, next: NextFunction) {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'You need to be authenticated to use this route',
      });
    }

    try {
      // Verify token
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userModel.findById(decoded.id);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'You need to be authenticated to use this route',
        });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'You need to be authenticated to use this route',
      });
    }
  }
}
