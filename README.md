
# Weather Analytics API

Create an API that fetches the current temperature and forecast for a list of cities
from a third-party weather API. It should also perform logic/aggregation such as
average temperature of all cities, highest and lowest temperature, and identifying
cities where temperature exceeds a given threshold. Uses database
(MySQL/Postgres). Caching can be used (optional).


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







