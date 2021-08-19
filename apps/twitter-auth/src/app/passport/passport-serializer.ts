import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    // There is a lot going on here, please read
    // https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
    // There is a lot going on here, please read
    // https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    done(null, payload);
  }
}
