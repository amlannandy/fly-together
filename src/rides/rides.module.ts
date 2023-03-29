import { Module } from '@nestjs/common';

import { RidesController } from 'rides/rides.controller';
import { RidesService } from 'rides/rides.service';

@Module({
  imports: [],
  controllers: [RidesController],
  providers: [RidesService],
})
export class RidesModule {}
