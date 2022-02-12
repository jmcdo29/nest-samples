# Uploading Files with GraphQL

All right! So it's time to make an app, and you've chosen GraphQL. All is great, but now the client wants to upload files. Okay, okay, no big deal. It's a bit annoying, but it's possible to do. This sample has a very simple example, but you can integrate it with DTOs as well if you'd like. We're going to make use of `@nestjs/graphql@10`, `@nestjs/apollo@10` and `graphql-upload` to manage all of this.

## The `GraphQLModule`

So for the `GraphQLModule` you just need to import it as you normally would:

```ts
GraphQLModule.forRoot({
  driver: ApolloDriver,
  autoSchemaFile: true,
}),
```

Super simple, nothing extra needed.

## The `*Resolver`

You'll need to make sure in your app there's at least one `@Query()`. Then,m for the uploads, `@Mutation()`s are the usual operations. I ended up with something like this:

```ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { createWriteStream, ReadStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class AppResolver {
  private async writeFile(
    stream: ReadStream,
    filename: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      stream
        .pipe(createWriteStream(`${process.cwd()}/uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false));
    });
  }

  @Query(() => String)
  sayHi() {
    return 'hello!';
  }

  @Mutation(() => Boolean)
  async postFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload
  ) {
    return this.writeFile(createReadStream(), filename);
  }

  @Mutation(() => Boolean)
  async postFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: FileUpload[]
  ) {
    console.log(files);
    return (
      await Promise.all(
        files.map(async (file) => {
          file = await file;
          return this.writeFile(file.createReadStream(), file.filename);
        })
      )
    ).every(Boolean);
  }

  @Mutation(() => String)
  async postFileWithFields(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args({ name: 'user', type: () => String })
    user: string
  ) {
    await this.writeFile(createReadStream(), filename);
    return user + ' true';
  }
}
```

## binding the graphql upload middleware

Last thing we need before making requests is to bind the middleware in our `main.ts`

```ts
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(graphqlUploadExpress()); // add whatever options you need here
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
```

## Making requests

And now we can make three different requests using curl (or postman or insomnia)

### Simple File Upload

```sh
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'x-gitlab-token: gl-secret' \
--form 'operations="{
  \"query\": \"mutation upload($file: Upload!){ postFile(file: $file) }\",
  \"variables\": { \"files\": null}
}"' \
--form 'map="{ \"0\": [\"variables.file\"] }"' \
--form '0=@"/path/to/file'
```

### Multiple File Upload

```sh
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'x-gitlab-token: gl-secret' \
--form 'operations="{
  \"query\": \"mutation upload($file: [Upload!]!){ postFiles(files: $file) }\",
  \"variables\": { \"files\": null }
}"' \
--form 'map="{ \"0\": [\"variables.file.0\"], \"1\": [\"variables.file.1\"] }"' \
--form '0=@"/path/to/file/1"' \
--form '1=@"/path/to/file/2"'
```

### Single File Upload with Extra Fields

```sh
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'x-gitlab-token: gl-secret' \
--form 'operations="{
  \"query\": \"mutation upload($file: Upload!, $user: String!){ postFileWithFields(file: $file, user: $user) }\",
  \"variables\": { \"files\": null, \"user\": \"Test User\" }
}"' \
--form 'map="{ \"0\": [\"variables.file\"] }"' \
--form '0=@"/path/to/file'
```
