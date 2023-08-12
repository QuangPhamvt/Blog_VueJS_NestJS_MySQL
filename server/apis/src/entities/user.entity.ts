import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto, UserDto } from '../modules/user/dto';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

@Entity('users')
export class User implements UserDto, CreateUserDto {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({
		name: 'Username',
		type: 'varchar',
		length: 30,
		unique: true,
	})
	username: string;

	@Column({
		name: 'Password',
		type: 'varchar',
	})
	password: string;

	@Column({
		name: 'hashRt',
		type: 'varchar',
		nullable: true,
	})
	hashRt: string;

	@Column({
		name: 'Role',
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@OneToMany(() => Post, (post) => post.id)
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.id)
	comments: Comment[];
}
