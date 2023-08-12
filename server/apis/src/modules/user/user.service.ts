import {
	BadRequestException,
	HttpException,
	Injectable,
	Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	//Register User
	async create(createUserDto: CreateUserDto): Promise<void> {
		const hash = await bcrypt.hash(createUserDto.password, 10);
		const { password, ...data } = createUserDto;
		await this.usersRepository
			.createQueryBuilder()
			.insert()
			.values({ password: hash, ...data })
			.execute();
	}

	// Find One USER using username
	async findOne(username: string): Promise<any> {
		return await this.usersRepository.findOneBy({ username });
	}
}
