import { UserRole } from '../../../entities/user.entity';

export interface AuthGuardDto {
	id: number;
	username: string;
}

export interface LoginUserDto {
	username: string;
	password: string;
}

export interface RegisterDto {
	username: string;
	password: string;
	role: UserRole;
}
export interface GetTokensDto {
	id: number;
	username: string;
}

export interface GetRefreshTokenDto {
	id: number;
	username: string;
	refresh_token: string;
}
