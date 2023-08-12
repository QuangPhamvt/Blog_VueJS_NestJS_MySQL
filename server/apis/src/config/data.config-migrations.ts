import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

const option: DataSourceOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['src/**/*.entity.ts'],
	migrations: ['src/database/migrations/*.ts}'],
	synchronize: true,
	logging: true,
};
export default new DataSource(option);
