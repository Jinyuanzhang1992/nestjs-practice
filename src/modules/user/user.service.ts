import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserMongo } from './types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CreateMongoUserDto } from './dto/create-mongo-user.dto';
import { UpdateMongoUserDto } from './dto/update-mongo-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: UserRepository,
    @InjectModel('User')
    private readonly userModel: Model<UserMongo>, // MongoDB 模型
  ) {}

  //postgreSQL 操作
  async findAll(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    if (!allUsers) {
      throw new NotFoundException('No users found');
    }
    return allUsers;
  }
  //定义一个findAll方法，返回所有用户数据，但是默认的Repository<User>中并没有findAll方法，所以需要自己实现，这里使用了find方法，是TypeORM提供的方法，用于查找所有实体或符合条件的实体
  //User[]表示返回值是一个User类型的数组

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('user:', user);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  //定义一个findOne方法，返回指定id的用户数据
  //User | undefined表示返回值是一个User类型或者undefined
  //User类型是接口，是一个对象，包含id和name属性
  //where { id }表示查询条件是id等于传入的id参数

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    //创建一个新用户
    return await this.userRepository.save(newUser);
    //保存新用户
  }
  //需要先创建一个新用户，然后保存这个新用户，这里使用了create和save方法，都是TypeORM提供的方法
  //create 方法用于创建一个新的实体实例，但并不会将这个实例保存到数据库中。
  //save 方法用于将一个实体实例保存到数据库中。如果该实体已经存在于数据库中，它会进行更新；如果该实体是新的，它会进行插入。

  async update(id: number, updateUserDto: UpdateMongoUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`Failed to update user with ID ${id}`);
    }
    return updatedUser;
  }
  // updateUserDto: UpdateUserDto 对updateUserDto 参数进行类型检查，确保传入的参数符合 UpdateUserDto 结构

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return user;
  }

  // MongoDB 操作
  async findAllMongoUsers(): Promise<UserMongo[]> {
    const allUsers = await this.userModel.find().exec();
    console.log('allUsers:', allUsers);
    if (allUsers.length === 0) {
      throw new NotFoundException('No users found');
    }

    const returnedUser = allUsers.map(
      (user) =>
        ({
          id: (user._id as ObjectId).toString(), // 将 ObjectId 转换为字符串
          name: user.name,
          age: user.age,
          gender: user.gender,
        }) as UserMongo,
    );

    return returnedUser;
  }

  async findOneMongoUser(id: string): Promise<UserMongo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const returnedUser = {
      id: (user._id as ObjectId).toString(),
      name: user.name,
      age: user.age,
    } as UserMongo;

    return returnedUser;
  }

  async createMongoUser(createUserDto: CreateMongoUserDto): Promise<UserMongo> {
    const newUser = new this.userModel(createUserDto);
    if (!newUser) {
      throw new NotFoundException('Failed to create user');
    }
    const createdUser = await newUser.save();

    if (!createdUser) {
      throw new NotFoundException('Failed to create user');
    }

    const returnedUser = {
      id: (createdUser._id as ObjectId).toString(),
      name: createdUser.name,
      age: createdUser.age,
    } as UserMongo;

    return returnedUser;
  }

  async updateMongoUser(
    id: string,
    updateUserDto: UpdateMongoUserDto,
  ): Promise<UserMongo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const existingUser = await this.findOneMongoUser(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`Failed to update user with ID ${id}`);
    }

    const returnedUser = {
      id: (updatedUser._id as ObjectId).toString(),
      name: updatedUser.name,
      age: updatedUser.age,
    } as UserMongo;

    return returnedUser;
  }

  async deleteMongoUser(id: string): Promise<UserMongo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const user = await this.findOneMongoUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`Failed to delete user with ID ${id}`);
    }

    const returnedUser = {
      id: (deletedUser._id as ObjectId).toString(),
      name: deletedUser.name,
      age: deletedUser.age,
    } as UserMongo;

    return returnedUser;
  }
}
