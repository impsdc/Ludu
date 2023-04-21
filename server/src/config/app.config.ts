import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtExpireRefresh: process.env.JWT_REFRESH_EXPIRE,
  database: {
    dev: process.env.DATABASE_URL,
    prod: process.env.DATABASE_URL_PRODUCTION,
  },
  user: {
    staticFolder: process.env.STATIC_USER_FOLDER,
  },
  game: {
    staticFolder: process.env.STATIC_GAME_FOLDER,
  },
}));
