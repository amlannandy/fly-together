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
import { Response } from 'express';

import { AuthService } from 'auth/auth.service';
import {
  ApiRequest,
  LoginBody,
  RegisterBody,
  UpdatePasswordBody,
} from 'auth/auth.types';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterBody, @Res() res: Response) {
    const token = await this.authService.create(body);

    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User successfully registered!',
      data: token,
    });
  }

  @Post('/login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    const token = await this.authService.authenticate(body);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: token,
    });
  }

  @Get('/current-user')
  currentUser(@Req() req: ApiRequest, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: req.user,
    });
  }

  @Put('/update-password')
  async updatePassword(
    @Req() req: ApiRequest,
    @Body() body: UpdatePasswordBody,
    @Res() res: Response,
  ) {
    await this.authService.updatePassword(req, body);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Password updated successfully!',
    });
  }

  @Delete('/delete-account')
  deleteAccount(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Delete Account',
    });
  }
}
