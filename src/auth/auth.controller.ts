import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from 'auth/auth.service';
import { LoginBody, RegisterBody } from 'auth/auth.types';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterBody, @Res() res: Response) {
    const token = this.authService.create(body);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User successfully registered!',
      data: token,
    });
  }

  @Post('/login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    const token = await this.authService.authenticate(body);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: token,
    });
  }

  @Get('/current-user')
  currentUser(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Get Current User',
    });
  }

  @Put('/update-password')
  updatePassword(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Update Password',
    });
  }

  @Delete('/delete-account')
  deleteAccount(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Delete Account',
    });
  }
}
