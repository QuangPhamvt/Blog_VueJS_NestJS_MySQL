import { User } from 'src/entities/user.entity';

export interface PostDto {
	id: number;
	title: string;
	post: string;
	createAt: Date;
	updateAt: Date;
	user: User;
}
export interface CreatePostDto {
	id: number;
	title: string;
	post: string;
	categories: string[];
}

export interface FindPostListDto {
	id: number;
	title?: string;
	userId?: number;
	page?: number;
	limit?: number;
}
export interface DeletePostById {
	id: number;
}
