import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from 'auth/auth.service';
import { RegisterBody } from 'auth/auth.types';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterBody, @Res() res: Response) {
    const user = this.authService.create(body);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User successfully registered!',
      data: user,
    });
  }

  @Post('/login')
  login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    return res.status(HttpStatus.OK).json({
      email,
      password,
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
