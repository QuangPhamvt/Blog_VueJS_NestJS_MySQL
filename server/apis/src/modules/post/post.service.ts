import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto, DeletePostById, FindPostListDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, In, IsNull, Like, Not, Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class PostService {
	private readonly logger = new Logger(PostService.name);
	constructor(
		@InjectRepository(Post)
		private postRepository: Repository<Post>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
	) {}
	// Create new post
	async createPost(dto: CreatePostDto): Promise<void> {
		try {
			const user = await this.userRepository.findOneBy({ id: dto.id });
			const categories = await this.categoryRepository.find({
				where: {
					category: In(dto.categories),
				},
			});
			const post = this.postRepository.create({
				user,
				categories,
				title: dto.title,
				post: dto.post,
			});
			await this.postRepository.save(post);
		} catch (error) {
			throw new BadRequestException('Wrong something', {
				description: error.message,
			});
		}
	}

	// Find Blog List
	async findPost(dto: FindPostListDto): Promise<object> {
		const { id, title, page, limit } = dto;
		const data = await this.postRepository.find({
			select: {
				id: true,
				title: true,
				createAt: true,
				user: {
					username: true,
				},
				categories: true,
			},
			relations: { user: true, categories: true },
			where: { id: id || Not(IsNull()), title: Like(`%${title || ''}%`) },
			skip: (page - 1) * limit || 0,
			take: limit || 5,
			order: {
				createAt: 'DESC',
			},
		});
		return data;
	}

	// Find Blog By Id
	async findPostById(dto: { id: number }): Promise<object> {
		const data = await this.postRepository.findOne({ where: { id: dto.id } });
		return data;
	}

	// Delete post by Id
	async DeletePostById(dto: DeletePostById): Promise<object> {
		const data = await this.postRepository.delete({ id: dto.id });
		return data;
	}
}
