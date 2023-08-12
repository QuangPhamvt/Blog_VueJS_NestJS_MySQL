import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	private readonly logger = new Logger(RtStrategy.name);
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
			passReqToCallback: true,
		});
	}
	async validate(req: Request, payload: any) {
		const rt = req.headers.authorization.split(' ')[1];
		return {
			id: payload.sub,
			username: payload.username,
			refresh_token: rt,
		};
	}
}
