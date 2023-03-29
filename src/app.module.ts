import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from 'auth/auth.module';
import { User, UserSchema } from 'auth/auth.model';
import { RidesModule } from 'rides/rides.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    AuthModule,
    RidesModule,
  ],
})
export class AppModule {}
