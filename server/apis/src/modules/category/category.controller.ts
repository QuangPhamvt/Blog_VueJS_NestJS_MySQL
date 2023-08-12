import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Response,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	async findPostByCategory(@Body() body, @Response() res) {
		const data = await this.categoryService.findCategory(body);
		return res.json({ data, message: 'Successfully!' });
	}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	async createCategory(@Body() body, @Response() res) {
		await this.categoryService.createCategory(body);
		return res.json({ message: 'Successfully!' });
	}
}
