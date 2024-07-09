<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
||||||| empty tree
=======
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
>>>>>>> ca4ce3eaf0c2536498f47cf4245532a22a9ffe19
