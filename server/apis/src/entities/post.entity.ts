import { User } from './user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { PostDto } from '../modules/post/dto/post.dto';
import { Category } from './category.entity';

@Entity('posts')
export class Post implements PostDto {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({
		name: 'Title',
		type: 'varchar',
		length: 50,
		unique: true,
	})
	title: string;

	@Column({
		name: 'Post',
		type: 'text',
	})
	post: string;

	@CreateDateColumn({ name: 'createAt' })
	createAt: Date;

	@UpdateDateColumn({ name: 'updateAt' })
	updateAt: Date;

	@ManyToOne(() => User, (user) => user.posts)
	@JoinColumn({
		name: 'user_id',
		referencedColumnName: 'id',
		foreignKeyConstraintName: 'fk_post_user_id',
	})
	user: User;

	@ManyToMany(() => Category, (category) => category.posts)
	categories: Category[];
}
