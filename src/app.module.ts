import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
