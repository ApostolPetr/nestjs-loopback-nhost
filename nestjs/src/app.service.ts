import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AppService {
  getPing(req: FastifyRequest) {
    return {
      greeting: 'Hello!',
      url: req.url,
    };
  }
}
