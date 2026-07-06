-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "feelsLike" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "pressure" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forecast" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "forecastDate" TIMESTAMP(3) NOT NULL,
    "minTemp" DOUBLE PRECISION NOT NULL,
    "maxTemp" DOUBLE PRECISION NOT NULL,
    "avgTemp" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "pressure" INTEGER NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "rainChance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsCache" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalyticsCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE INDEX "City_name_idx" ON "City"("name");

-- CreateIndex
CREATE INDEX "WeatherData_cityId_idx" ON "WeatherData"("cityId");

-- CreateIndex
CREATE INDEX "WeatherData_fetchedAt_idx" ON "WeatherData"("fetchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_cityId_fetchedAt_key" ON "WeatherData"("cityId", "fetchedAt");

-- CreateIndex
CREATE INDEX "Forecast_cityId_idx" ON "Forecast"("cityId");

-- CreateIndex
CREATE INDEX "Forecast_forecastDate_idx" ON "Forecast"("forecastDate");

-- CreateIndex
CREATE UNIQUE INDEX "Forecast_cityId_forecastDate_key" ON "Forecast"("cityId", "forecastDate");

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsCache_key_key" ON "AnalyticsCache"("key");

-- CreateIndex
CREATE INDEX "AnalyticsCache_expiresAt_idx" ON "AnalyticsCache"("expiresAt");

-- AddForeignKey
ALTER TABLE "WeatherData" ADD CONSTRAINT "WeatherData_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast" ADD CONSTRAINT "Forecast_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
