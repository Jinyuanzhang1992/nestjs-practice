import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('input') input: LoginRequestDto,
    @Context() context,
  ): Promise<LoginResponseDto> {
    // const user = input;
    const user = context.req.user; // 从上下文中获取已验证的用户对象
    const token = await this.authService.login(user);
    return { user, token };
  }
}

// import { LoginRequestDto } from './dto/login-request.dto';
// import { LoginResponseDto } from './dto/login-response.dto';
// import { AuthService } from './auth.service';
// import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { LocalStrategy } from './local.strategy';
// import { LocalAuthGuard } from './local-auth.guard';
// import { UseGuards } from '@nestjs/common';

// @Resolver()
// export class AuthResolver {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly localStrategy: LocalStrategy,
//   ) {}

//   @Mutation(() => LoginResponseDto)
//   // @UseGuards(LocalAuthGuard)
//   async login(
//     @Args('input') input: LoginRequestDto,
//   ): Promise<LoginResponseDto> {
//     const { username, password } = input;
//     const user = await this.localStrategy.validate(username, password);
//     const token = await this.authService.login(user);
//     return { user, token };
//   }
// }
