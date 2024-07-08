import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './types';
import { ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver('users')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAll(): User[] {
    return this.userService.findAll();
  }
  //@Query(() => [User])用于定义一个查询操作，返回值是一个User类型的数组

  @Query(() => User)
  findOne(@Args('id', ParseIntPipe) id: number): User | undefined {
    return this.userService.findOne(id);
  }
  //参数会被解析为字符串，所以需要使用 ParseIntPipe 将其转换为数字
  //ParseIntPipe：在运行时将传入的参数从字符串转换为整数类型。
  //id: number：在编译时指定参数的类型为 number，以便进行类型检查。

  @Mutation(() => User)
  create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  //所有参数都被解析为字符串，所以需要使用 ParseIntPipe 将 age 参数转换为数字
  //User：指定返回值的类型为 User，以便进行类型检查

  @Mutation(() => User)
  update(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): User | undefined {
    return this.userService.update(updateUserDto);
  }
  //() => User 指的是返回前端的数据类型
  // User | undefined  指的是调用函数返回的数据类型
  //updateUserDto: UpdateUserDto 值得是传入函数的参数类型

  @Mutation(() => User)
  delete(@Args('id', ParseIntPipe) id: number): User | undefined {
    return this.userService.delete(id);
  }
}
