import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');
	app.enableCors({
		origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_SECOND],
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle('DEMO simple')
		.setDescription('The DEMO APIs description')
		.setVersion('1.0')
		.addTag('user')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('', app, document);
	await app.listen(process.env.PORT);
}
bootstrap();
