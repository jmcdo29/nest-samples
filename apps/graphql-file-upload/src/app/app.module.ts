import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLUpload } from 'graphql-upload';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: 'Upload',
      useValue: GraphQLUpload,
    },
  ],
})
export class AppModule {}
