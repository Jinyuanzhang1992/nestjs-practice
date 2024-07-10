import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserMongo } from './types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMongoUserDto } from './dto/create-mongo-user.dto';
import { UpdateMongoUserDto } from './dto/update-mongo-user.dto';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/roles.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //postgreSQL操作
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Query(() => [User])
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  //@Query(() => [User])用于定义一个查询操作，返回值是一个User类型的数组

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Student)
  @Query(() => User)
  async findOne(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<User | undefined> {
    return await this.userService.findOne(id);
  }
  //参数会被解析为字符串，所以需要使用 ParseIntPipe 将其转换为数字
  //ParseIntPipe：在运行时将传入的参数从字符串转换为整数类型。
  //id: number：在编译时指定参数的类型为 number，以便进行类型检查。

  @Mutation(() => User)
  async create(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(createUserDto);
  }
  //所有参数都被解析为字符串，所以需要使用 ParseIntPipe 将 age 参数转换为数字
  //User：指定返回值的类型为 User，以便进行类型检查

  @Mutation(() => User)
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    return await this.userService.update(id, updateUserDto);
  }
  //() => User 指的是返回前端的数据类型
  // User | undefined  指的是调用函数返回的数据类型
  //updateUserDto: UpdateUserDto 值得是传入函数的参数类型

  @Mutation(() => User)
  async delete(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<User | undefined> {
    return await this.userService.delete(id);
  }

  //MongoDB操作
  @Query(() => [UserMongo])
  async findAllMongoUsers(): Promise<UserMongo[]> {
    return await this.userService.findAllMongoUsers();
  }

  @Query(() => UserMongo)
  async findOneMongoUser(@Args('id') id: string): Promise<UserMongo> {
    return await this.userService.findOneMongoUser(id);
  }

  @Mutation(() => UserMongo)
  async createMongoUser(
    @Args('createMongoUserDto') createMongoUserDto: CreateMongoUserDto,
  ): Promise<UserMongo> {
    return await this.userService.createMongoUser(createMongoUserDto);
  }

  @Mutation(() => UserMongo)
  async updateMongoUser(
    @Args('id') id: string,
    @Args('updateMongoUserDto') updateMongUserDto: UpdateMongoUserDto,
  ): Promise<UserMongo> {
    return await this.userService.updateMongoUser(id, updateMongUserDto);
  }

  @Mutation(() => UserMongo)
  async deleteMongoUser(@Args('id') id: string): Promise<UserMongo> {
    return await this.userService.deleteMongoUser(id);
  }
}
