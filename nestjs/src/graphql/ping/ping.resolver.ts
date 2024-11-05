import { Query, Resolver } from '@nestjs/graphql';
import { Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Ping } from 'src/graphql';

@Resolver('Ping')
export class PingResolver {
  @Query()
  async ping(@Req() req: FastifyRequest): Promise<Ping> {
    return {
      greeting: 'Hello!',
      url: req.url ?? 'graphql',
    };
  }
}
