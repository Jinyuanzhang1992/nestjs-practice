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
import { User } from './types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
//只能用单引号，不能用双引号
export class UserController {
  constructor(private readonly userService: UserService) {}
  //将UserService注入到UserController中,并且将其赋值给userService属性

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User | undefined {
    return this.userService.findOne(id); //调用UserService的findOne方法，传入id参数
  }
  //使用 ParseIntPipe 将路径参数 id 从字符串转换为数字

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }
  //createUserDto: CreateUserDto 定义了 create 方法接收的数据类型，确保只有符合 CreateUserDto 结构的数据才能传入，否则会抛出异常
  //createUserDto 是一个参数，它的类型是 CreateUserDto，这个参数是通过 @Body() 装饰器获取的，表示从请求体中获取数据

  @Put(':id')
  update(@Body() updateUserDto: UpdateUserDto): User {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.delete(id);
  }
}
