import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class FormGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { query, body } = req;
    if (query.foo !== body.foo) {
      return false;
    }
    return true;
  }
}
