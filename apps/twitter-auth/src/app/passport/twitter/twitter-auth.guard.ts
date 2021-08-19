import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TwitterAuthGuard extends AuthGuard('twitter') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const result = (await super.canActivate(context)) as boolean; // THIS MUST BE CALLED FIRST
    await super.logIn(request);
    return result;
  }
}
