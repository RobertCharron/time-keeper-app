import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityUsesService } from './activity-uses.service';
import { ActivityUsesController } from './activity-uses.controller';
import { ActivityUse } from './entities/activity-use.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityUse])],
  controllers: [ActivityUsesController],
  providers: [ActivityUsesService],
  exports: [ActivityUsesService],
})
export class ActivityUsesModule {}
