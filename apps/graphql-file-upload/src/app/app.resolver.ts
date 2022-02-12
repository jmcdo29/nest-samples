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
