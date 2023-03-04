import {
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

@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('/register')
  register(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    return res.status(HttpStatus.OK).json({
      email,
      password,
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
