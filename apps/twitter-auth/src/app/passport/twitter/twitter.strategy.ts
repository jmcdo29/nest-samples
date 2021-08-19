import { Strategy } from 'passport-twitter';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { Request } from 'express';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // You must replace the callbackURL with your host DNS, or same if
    // deploying locally. You must also create a .env file with the PORT,
    // TWITTER_API_KEY, and TWITTER_API_SECRET. The Twitter API key and secret
    // can be obtained by visiting https://developer.twitter.com/en/portal/dashboard
    super({
      consumerKey: configService.get<string>('TWITTER_API_KEY'),
      consumerSecret: configService.get<string>('TWITTER_API_SECRET'),
      callbackURL: `http://127.0.0.1:${process.env.PORT || 3333}/api/auth/twitter/callback`,
      passReqToCallback: true,
      // includeEmail: true,
    });
  }

  // noinspection JSUnusedGlobalSymbols - This is used by the Passport strategy
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const twitterUser = {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      email: profile.emails?.shift().value,
      photo: profile.photos?.shift().value,
    };
    return Promise.resolve(twitterUser);
    // return await User.findOrCreate({ twitterId: profile.id }).exec();
  }
}
