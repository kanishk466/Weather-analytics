import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCurrentWeather(city: string) {


    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    const baseUrl = this.configService.get<string>('WEATHER_API_BASE_URL');

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${baseUrl}/weather`, {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric',
          },
        }),
      );

      return data;
    } catch {
      throw new NotFoundException(`City "${city}" not found`);
    }
  }

  async getForecast(city: string) {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    const baseUrl = this.configService.get<string>('WEATHER_API_BASE_URL');

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${baseUrl}/forecast`, {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric',
          },
        }),
      );

      return data;
    } catch {
      throw new NotFoundException(`Forecast not found for "${city}"`);
    }
  }
}