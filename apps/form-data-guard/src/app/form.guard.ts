import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class FormGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
