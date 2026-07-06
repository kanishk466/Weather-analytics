export default () => ({
    weather: {
        apiKey: process.env.WEATHER_API_KEY,
        baseUrl: process.env.WEATHER_BASE_URL,
    },
});