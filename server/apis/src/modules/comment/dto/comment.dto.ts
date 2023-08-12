import { Post } from '../../../entities/post.entity';
import { User } from '../../../entities/user.entity';

export interface CommentDto {
	id: number;
	authorId: User;
	postId: Post;
	comment: string;
	createAt: Date;
	updateAt: Date;
}
