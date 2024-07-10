// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

// //JwtAuthGuard 继承自 AuthGuard 并传入 'jwt' 作为参数。这意味着 JwtAuthGuard 将使用 JwtStrategy 进行身份验证。
// //JwtStrategy 是一个 Passport 策略，用于验证和解码 JWT。当请求携带 JWT 时，JwtStrategy 会解码并验证其有效性。如果 JWT 有效，将用户信息附加到请求对象上。

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log('ctx: ', ctx);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
