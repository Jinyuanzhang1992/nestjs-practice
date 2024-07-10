import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username', // 对应请求体中的字段名
      passwordField: 'password', // 对应请求体中的字段名
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    console.log('user in local: ', user);

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return user;
  }
}

// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(username: string, password: string): Promise<any> {
//     const user = await this.authService.validateUser(username, password);

//     console.log('user in local: ', user);

//     if (!user) {
//       throw new UnauthorizedException('用户名或密码错误');
//     }
//     return user;
//   }
// }
// //本地验证策略是 Passport 的一个策略，用于验证用户的用户名和密码
