import {
	Controller,
	Post,
	Logger,
	Req,
	HttpStatus,
	HttpCode,
	Res,
	Param,
	Delete,
	Body,
	UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { Request, Response } from 'express';
import { AtGuard } from '../auth/guards/at-auth.guard';

@Controller('post')
export class PostController {
	private readonly logger = new Logger(PostController.name);
	constructor(private readonly postService: PostService) {}

	// Create Blog
	@UseGuards(AtGuard)
	@Post('create')
	@HttpCode(HttpStatus.OK)
	async createPost(
		@Req() req: Request,
		@Res() res: Response,
	): Promise<Response> {
		const dto: CreatePostDto = { id: req.user['id'], ...req.body };
		await this.postService.createPost(dto);
		return res.json({
			message: 'Successfully',
		});
	}
	// Find blog list
	@Post()
	async findPostList(@Req() req: Request, @Res() res: Response) {
		const data = await this.postService.findPost(req.body);
		return res.json({ data, message: 'Successfully' });
	}
	@Post('id')
	async findPostById(@Body() body: { id: number }, @Res() res) {
		const data = await this.postService.findPostById(body);
		return res.json({ data, message: 'Successfully!' });
	}

	// Delete Blog using id
	@Delete(`/:id`)
	async deletePostById(
		@Param(`id`) id: number,
		@Res() res: Response,
	): Promise<object> {
		const data = await this.postService.DeletePostById({ id });
		return res.json({
			data,
			message: 'Successfully!',
		});
	}
}
