import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	controllers: [CategoryController],
	providers: [CategoryService],
})
export class categoryModule {}
