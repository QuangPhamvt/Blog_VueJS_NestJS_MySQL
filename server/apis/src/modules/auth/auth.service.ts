import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto';
import {
	GetRefreshTokenDto,
	GetTokensDto,
	AuthGuardDto,
	LoginUserDto,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}
	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userRepository.findOne({ where: { username } });
		const isCompare = await bcrypt.compare(password, user?.password);
		if (user && isCompare) {
			const { password, hashRt, role, ...result } = user;
			return result;
		}
		return null;
	}

	// Login user
	async logIn(dto: AuthGuardDto): Promise<any[]> {
		const { access_token, refresh_token } = await this.getTokens({
			id: dto.id,
			username: dto.username,
		});
		await this.updateToken(dto.id, refresh_token);
		return [{ access_token, refresh_token }];
	}

	// Logout user
	async logout(dto: AuthGuardDto) {
		await this.userRepository.update({ id: dto.id }, { hashRt: null });
	}

	// Get Profile User
	async getProfileUser(dto: AuthGuardDto): Promise<any[]> {
		const { password, hashRt, ...result } = await this.userRepository.findOne({
			where: { id: dto.id },
		});
		return [result];
	}

	// Register user
	async register(dto: CreateUserDto): Promise<void> {
		try {
			await this.userService.create(dto);
		} catch (error) {
			throw new BadRequestException('Failing', {
				cause: error,
				description: 'Not exist username or password',
			});
		}
	}

	// Refresh token
	async getRefreshToken(dto: GetRefreshTokenDto): Promise<any[]> {
		this.logger.log(dto);
		const user = await this.userRepository.findOne({
			where: { id: dto.id },
		});
		if (!user || !user.hashRt) throw new ForbiddenException('Access denied');

		this.logger.log(dto.refresh_token);
		if (user.hashRt !== dto.refresh_token)
			throw new ForbiddenException('Access denied');

		const { access_token, refresh_token } = await this.getTokens({
			id: user.id,
			username: user.username,
		});
		await this.updateToken(user.id, refresh_token);

		return [{ access_token, refresh_token }];
	}

	// Setup AToken and RToken
	async getTokens(
		dto: GetTokensDto,
	): Promise<{ access_token: string; refresh_token: string }> {
		const jwtPayload = { username: dto.username, sub: dto.id };

		const at = await this.jwtService.signAsync(jwtPayload, {
			expiresIn: '10h',
		});
		const rt = await this.jwtService.signAsync(jwtPayload, {
			expiresIn: '7d',
		});
		return {
			access_token: at,
			refresh_token: rt,
		};
	}

	// Update token for user
	async updateToken(id: number, rt: string) {
		await this.userRepository.update({ id }, { hashRt: rt });
	}
}
