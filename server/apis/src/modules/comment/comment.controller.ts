import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
}
