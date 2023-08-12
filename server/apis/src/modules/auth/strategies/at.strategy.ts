import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	private readonly logger = new Logger();
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}
	async validate(payload: any) {
		return { id: payload.sub, username: payload.username };
	}
}
