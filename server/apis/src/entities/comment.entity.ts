import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CommentDto } from '../modules/comment/dto/comment.dto';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment implements CommentDto {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@ManyToOne(() => User, (author) => author.id)
	@JoinColumn({
		name: 'user_id',
		referencedColumnName: 'id',
		foreignKeyConstraintName: 'fk_user_id',
	})
	authorId: User;

	@ManyToOne(() => Post, (post) => post.id)
	@JoinColumn({
		name: 'post_id',
		referencedColumnName: 'id',
		foreignKeyConstraintName: 'fk_post_id',
	})
	postId: Post;

	@Column({
		name: 'Comment',
		type: 'text',
	})
	comment: string;

	@CreateDateColumn({ name: 'createAt' })
	createAt: Date;

	@UpdateDateColumn({ name: 'updateAt' })
	updateAt: Date;
}
