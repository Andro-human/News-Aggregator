import dotenv from 'dotenv';

dotenv.config();

const config = Object.freeze({
  port: parseInt(process.env.PORT ?? '8080', 10),
  mongoUrl: process.env.MONGO_URL ?? '',
  newsApiKey: process.env.NEWS_API_KEY ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
});

export default config;
