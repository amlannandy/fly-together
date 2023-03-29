import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/rides')
export class RidesController {
  @Get('/list/all')
  listAllRides(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'List All Rides',
    });
  }

  @Get('/list/user/:userId')
  listUserRides(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'List User Rides',
    });
  }

  @Post('/create')
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Create Ride',
    });
  }

  @Get('/:id')
  get(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Get Ride by Id',
    });
  }

  @Put('/:id')
  update(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Update Ride by Id',
    });
  }

  @Delete('/:id')
  delete(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Delete Ride by Id',
    });
  }
}
