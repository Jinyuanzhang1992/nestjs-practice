import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserMongo } from './types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMongoUserDto } from './dto/create-mongo-user.dto';
import { UpdateMongoUserDto } from './dto/update-mongo-user.dto';

@Controller('users')
//只能用单引号，不能用双引号
export class UserController {
  constructor(private readonly userService: UserService) {}
  //将UserService注入到UserController中,并且将其赋值给userService属性

  //MongoDB 操作
  @Get('mongo')
  async findAllMongoUsers(): Promise<UserMongo[]> {
    return this.userService.findAllMongoUsers();
  }

  @Get('mongo/:id')
  async findOneMongoUser(@Param('id') id: string): Promise<UserMongo> {
    return this.userService.findOneMongoUser(id);
  }

  @Post('mongo')
  async createMongoUser(
    @Body() createUserDto: CreateMongoUserDto,
  ): Promise<UserMongo> {
    return this.userService.createMongoUser(createUserDto);
  }

  @Put('mongo/:id')
  async updateMongoUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateMongoUserDto,
  ): Promise<UserMongo> {
    return await this.userService.updateMongoUser(id, updateUserDto);
  }

  @Delete('mongo/:id')
  async deleteMongoUser(@Param('id') id: string): Promise<UserMongo> {
    return await this.userService.deleteMongoUser(id);
  }

  //postgreSQL 操作
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | undefined> {
    return await this.userService.findOne(id); //调用UserService的findOne方法，传入id参数
  }
  //使用 ParseIntPipe 将路径参数 id 从字符串转换为数字

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
  //createUserDto: CreateUserDto 定义了 create 方法接收的数据类型，确保只有符合 CreateUserDto 结构的数据才能传入，否则会抛出异常
  //createUserDto 是一个参数，它的类型是 CreateUserDto，这个参数是通过 @Body() 装饰器获取的，表示从请求体中获取数据

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.delete(id);
  }
}
