import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  app: {
    name: process.env.APP_NAME!,
    env: process.env.NODE_ENV!,
    port: Number(process.env.PORT),
  },

  frontend: {
    url: process.env.FRONTEND_URL!,
  },
}));
