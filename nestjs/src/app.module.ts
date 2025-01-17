import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { PingResolver } from './graphql/ping/ping.resolver';

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV || ''}.env` }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      path: 'v1/graphql',
      graphql: {},
      typePaths: ['./**/*.graphql'],
      graphiql: process.env.NODE_ENV === 'development',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },

    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PingResolver],
})
export class AppModule {}
