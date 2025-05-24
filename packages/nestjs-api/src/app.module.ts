import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { StationsModule } from './stations/stations.module';
import { ActivityUsesModule } from './activity-uses/activity-uses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    ActivitiesModule,
    StationsModule,
    ActivityUsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
