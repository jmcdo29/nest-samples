import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {

	validate(username: string, password: string) {
		console.log({ username, password });
		return username === 'nest' && password === 'N3stR0ck$';
	}
}
