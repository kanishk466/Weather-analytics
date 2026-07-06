import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CitiesDto } from 'src/dto/cities.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('cities')
 @Post('cities')
analyseCities(@Body() body: CitiesDto) {
  return this.analyticsService.analyseCities(body.cities);
}

  @Get('city/:name')
  getCityAnalytics(@Param('name') name: string) {
    return this.analyticsService.getCityAnalytics(name);
  }
}