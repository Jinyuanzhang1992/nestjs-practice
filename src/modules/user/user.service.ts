import { Injectable } from '@nestjs/common';
import { User } from './types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'user1' },
    { id: 2, name: 'user2' },
    { id: 3, name: 'user3' },
  ];
  //定义一个私有属性users，用来存储用户数据

  findAll(): User[] {
    return this.users;
  }
  //定义一个findAll方法，返回所有用户数据
  //User[]表示返回值是一个User类型的数组

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  //定义一个findOne方法，返回指定id的用户数据
  //User | undefined表示返回值是一个User类型或者undefined
  //User类型是接口，是一个对象，包含id和name属性

  create(createUserDto: CreateUserDto): User {
    const id = this.users.length + 1;
    const newUser = { id, ...createUserDto };
    this.users.push(newUser);
    console.log('Full Users:', this.users);
    return newUser;
  }

  update(updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === updateUserDto.id,
    );

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users[userIndex] = Object.assign(this.users[userIndex], updateUserDto);
    console.log('Full Users:', this.users);
    return this.users[userIndex];
    // Object.assign(user, updateUserDtp);
    // Object.assign(target, ...source) 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象，即 user 对象
  }
  // updateUserDto: UpdateUserDto 对updateUserDto 参数进行类型检查，确保传入的参数符合 UpdateUserDto 结构

  delete(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    console.log('Full Users:', this.users);
    return deletedUser;
  }
}
