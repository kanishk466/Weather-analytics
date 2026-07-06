
# Weather Analytics API

A REST API built with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** that fetches weather data from a third-party weather service, stores it in a database, and provides aggregated weather analytics for multiple cities.


## Features

- Fetch current weather for multiple cities
- Store city information in PostgreSQL
- Store current weather history
- Store 5-day forecast
- Get weather analytics for a single city

---

## Project Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd weather-analytics
```

### 2. Install 

```bash
npm install
```

### 3.Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://username:password@localhost:5432/weather_analytics?schema=public"

OPENWEATHER_API_KEY=YOUR_API_KEY

OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

---

### 4. Generate Prisma Client

```bash
npx prisma generate
```

---

### 5. Run Database Migration

```bash
npx prisma migrate dev --name init
```

---

### 6. Start Application

```bash
npm run start:dev
```

Server runs on

```
http://localhost:3000
```

---

# API Endpoints

## 1. Get Weather Analytics for Multiple Cities

### POST

```
/analytics/cities
```

### Request

```json
{
  "cities": [
    "London",
    "Tokyo",
    "New York"
  ]
}
```

### Response

```json
{
  "averageTemperature": 24.5,
  "highestTemperature": {
    "city": "Tokyo",
    "temp": 30
  },
  "lowestTemperature": {
    "city": "London",
    "temp": 18
  },
  "hotCities": [
    "Tokyo"
  ]
}
```

---

## 2. Get Analytics for Single City

### GET

```
/analytics/city/:name
```

Example

```
GET /analytics/city/Tokyo
```

### Response

```json
{
  "city": "Tokyo",
  "currentTemperature": 31,
  "minForecast": 26,
  "maxForecast": 34,
  "warning": null
}
```

---

# Database Tables

- City
- WeatherData
- Forecast
- AnalyticsCache

---

# Validation

Request validation is implemented using NestJS `ValidationPipe` and `class-validator`.

---

# Run in Development

```bash
npm run start:dev
```

---

# Build

```bash
npm run build
```

---

# Author

Kanishk Singh Maurya
````
