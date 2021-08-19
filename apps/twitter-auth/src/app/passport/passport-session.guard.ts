import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class PassportSessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    try {
      if (request.session.passport.user) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
