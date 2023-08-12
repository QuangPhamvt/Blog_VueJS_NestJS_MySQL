import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/data.config';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { categoryModule } from './modules/category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(typeOrmConfigAsync),
		UserModule,
		PostModule,
		CommentModule,
		AuthModule,
		categoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
