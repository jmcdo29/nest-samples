import { Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { TwitterAuthGuard } from './passport/twitter/twitter-auth.guard';
import { PassportSessionGuard } from './passport/passport-session.guard';

@Controller('auth')
export class AppController {
  @Get('twitter')
  @UseGuards(TwitterAuthGuard)
  async twitter() {
    throw new UnauthorizedException(); // Guard redirects
  }

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req: Request, @Res() res: Response) {
    // Redirect the callback from Twitter to an Passport-session protected route
    res.redirect('test');
  }

  // This route is now protected by Passport session (Twitter session this case)
  @Get('twitter/test')
  @UseGuards(PassportSessionGuard)
  async test(@Req() req: Request, @Res() res: Response) {
    // You can access the Twitter OAuth user from the req.user object
    res.send(req.user);
  }
}
