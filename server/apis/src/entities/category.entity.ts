import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('categories')
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({
		name: 'Category',
		type: 'varchar',
		width: 200,
		unique: true,
	})
	category: string;

	@ManyToMany(() => Post, (post) => post.categories)
	@JoinTable({
		name: 'categories_posts',
		joinColumn: {
			name: 'categories_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'posts_id',
			referencedColumnName: 'id',
		},
	})
	posts: Post[];
}
