import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
		}),
		TypeOrmModule.forFeature([User]),
		PassportModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, AtStrategy, RtStrategy],
})
export class AuthModule {}
