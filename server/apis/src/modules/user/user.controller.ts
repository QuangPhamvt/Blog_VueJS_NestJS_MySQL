import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Injectable,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// Register
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {}
}
