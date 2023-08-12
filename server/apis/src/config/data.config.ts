import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	TypeOrmModuleAsyncOptions,
	TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
	static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
		return {
			type: 'mysql',
			host: configService.get('DB_HOST'),
			port: parseInt(configService.get('DB_PORT')),
			username: configService.get('DB_USERNAME'),
			password: configService.get('DB_PASSWORD'),
			database: configService.get('DB_NAME'),
			entities: [__dirname + '/../**/*.entity{.js,.ts}'],
			migrations: [__dirname + '/../migrations/*{.js,.ts}'],
			synchronize: true,
			logging: false,
		};
	}
}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (
		configService: ConfigService,
	): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
};
