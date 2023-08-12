import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { IsNull, Repository, Not, Like } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) {}
	// create category
	async createCategory(dto: CategoryDto): Promise<void> {
		const category = this.categoryRepository.create({ category: dto.category });
		await this.categoryRepository.save(category);
	}
	// find category
	async findCategory(dto: CategoryDto): Promise<object> {
		const data = await this.categoryRepository.find({
			where: {
				id: dto.id || Not(IsNull()),
				category: Like(`%${dto.category || ''}%`),
			},
		});
		return data;
	}
}
