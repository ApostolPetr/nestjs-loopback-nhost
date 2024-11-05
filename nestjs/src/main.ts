// eslint-disable-next-line  @typescript-eslint/no-require-imports
require('dotenv').config({ path: `./${process.env.NODE_ENV || ''}.env` });

import { NestFactory } from '@nestjs/core';
import { constants } from 'zlib';
import fastifyCookie from '@fastify/cookie';
import compression from '@fastify/compress';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
// import fastifryCsrf from '@fastify/csrf-protection';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifyCookie, {
    secret: 'my-secret',
  });
  app.register(compression, {
    brotliOptions: { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } },
  });
  app.enableCors({
    credentials: true,
    origin: JSON.parse(process.env.CLIENT_ORIGINS),
  });

  // app.register(fastifryCsrf);
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}

bootstrap();