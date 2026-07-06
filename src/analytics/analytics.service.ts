import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weatherService: WeatherService,
  ) {}

  async analyseCities(cities: string[]) {
    const response: { city: string; temperature: number }[] = [];

    for (const cityName of cities) {
      // Current Weather
      const weather = await this.weatherService.getCurrentWeather(cityName);

      // Find or Create City
      let city = await this.prisma.city.findUnique({
        where: {
          name: weather.name,
        },
      });

      if (!city) {
        city = await this.prisma.city.create({
          data: {
            name: weather.name,
            latitude: weather.coord.lat,
            longitude: weather.coord.lon,
            country: weather.sys.country,
          },
        });
      }

      // Save Current Weather
      await this.prisma.weatherData.create({
        data: {
          cityId: city.id,
          temperature: weather.main.temp,
          feelsLike: weather.main.feels_like,
          humidity: weather.main.humidity,
          pressure: weather.main.pressure,
          description: weather.weather[0].description,
          icon: weather.weather[0].icon,
          windSpeed: weather.wind.speed,
        },
      });

      // Save Forecast (Optional - continue if it fails)
      try {
        const forecast = await this.weatherService.getForecast(city.name);

        for (const item of forecast.list) {
          await this.prisma.forecast.upsert({
            where: {
              cityId_forecastDate: {
                cityId: city.id,
                forecastDate: new Date(item.dt_txt),
              },
            },
            update: {
              minTemp: item.main.temp_min,
              maxTemp: item.main.temp_max,
              avgTemp: item.main.temp,
              description: item.weather[0].description,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              windSpeed: item.wind.speed,
              rainChance: Math.round((item.pop ?? 0) * 100),
            },
            create: {
              cityId: city.id,
              forecastDate: new Date(item.dt_txt),
              minTemp: item.main.temp_min,
              maxTemp: item.main.temp_max,
              avgTemp: item.main.temp,
              description: item.weather[0].description,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              windSpeed: item.wind.speed,
              rainChance: Math.round((item.pop ?? 0) * 100),
            },
          });
        }
      } catch (error) {
        console.log(`Forecast not available for ${city.name}`);
      }

      response.push({
        city: city.name,
        temperature: weather.main.temp,
      });
    }

    // Aggregation
    const temperatures = response.map((r) => r.temperature);

    const averageTemperature =
      temperatures.reduce((sum, temp) => sum + temp, 0) /
      temperatures.length;

    const highest = response.reduce((prev, curr) =>
      curr.temperature > prev.temperature ? curr : prev,
    );

    const lowest = response.reduce((prev, curr) =>
      curr.temperature < prev.temperature ? curr : prev,
    );

    const hotCities = response
      .filter((city) => city.temperature > 35)
      .map((city) => city.city);

    return {
      averageTemperature: Number(averageTemperature.toFixed(2)),
      highestTemperature: {
        city: highest.city,
        temp: highest.temperature,
      },
      lowestTemperature: {
        city: lowest.city,
        temp: lowest.temperature,
      },
      hotCities,
    };
  }

  async getCityAnalytics(cityName: string) {
    const city = await this.prisma.city.findUnique({
      where: {
        name: cityName,
      },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const currentWeather = await this.prisma.weatherData.findFirst({
      where: {
        cityId: city.id,
      },
      orderBy: {
        fetchedAt: 'desc',
      },
    });

    const forecasts = await this.prisma.forecast.findMany({
      where: {
        cityId: city.id,
      },
      orderBy: {
        forecastDate: 'asc',
      },
    });

    const minForecast =
      forecasts.length > 0
        ? Math.min(...forecasts.map((f) => f.minTemp))
        : null;

    const maxForecast =
      forecasts.length > 0
        ? Math.max(...forecasts.map((f) => f.maxTemp))
        : null;

    return {
      city: city.name,
      currentTemperature: currentWeather?.temperature ?? null,
      minForecast,
      maxForecast,
      warning:
        (currentWeather?.temperature ?? 0) > 35
          ? 'Temperature exceeds 35°C'
          : null,
    };
  }
}