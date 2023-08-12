import { Comment } from '../../../entities/comment.entity';
import { Post } from '../../../entities/post.entity';

enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export interface UserDto {
	id: number;
	username: string;
	password: string;
	role: UserRole;
	posts: Post[];
	comments: Comment[];
}
export interface CreateUserDto {
	username: string;
	password: string;
	role: UserRole;
	posts?: Post[];
	comments?: Comment[];
}
