import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from './config/database.config';
import { PrismaModule } from './prisma/prisma.module';
import { WeatherModule } from './weather/weather.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    PrismaModule,
    WeatherModule,
    AnalyticsModule
  ],
})
export class AppModule {}