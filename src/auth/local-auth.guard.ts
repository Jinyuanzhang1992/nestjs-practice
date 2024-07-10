import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

type ContextType = 'http' | 'graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      return (await super.canActivate(context)) as boolean;
    } else if (context.getType() === ('graphql' as ContextType)) {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      request.body = ctx.getArgs().input;
      return (await super.canActivate(context)) as boolean;
    }
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    } else if (context.getType() === ('graphql' as ContextType)) {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      request.body = ctx.getArgs().input;
      return request;
    }
  }

  handleRequest(err, user, info) {
    console.log('handleRequest called');
    console.log('user: ', user);
    console.log('err: ', err);
    console.log('info: ', info);
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message);
    }
    return user;
  }
}

// import {
//   Injectable,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context);
//     const request = ctx.getContext().req;
//     request.body = ctx.getArgs().input; // 将 GraphQL 参数映射到请求体中
//     return (await super.canActivate(context)) as boolean;
//   }

//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     const request = ctx.getContext().req;
//     request.body = ctx.getArgs().input; // 将 GraphQL 参数映射到请求体中
//     return request;
//   }

//   handleRequest(err, user, info) {
//     console.log('handleRequest called');
//     console.log('user: ', user);
//     console.log('err: ', err);
//     console.log('info: ', info);
//     if (err || !user) {
//       throw err || new UnauthorizedException(info?.message);
//     }
//     return user;
//   }
// }

// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     await super.canActivate(context);
//     const request = context.switchToHttp().getRequest();
//     console.log('request in local-auth.guard: ', request);
//     //通过调用 super.canActivate(context)，LocalAuthGuard 使用基类 AuthGuard 的 canActivate 方法来处理初始的身份验证逻辑。
//     return true;
//     //返回 true 表示守卫成功通过，允许请求继续执行。
//   }
// }

// LocalAuthGuard 类继承自 AuthGuard 类，用于本地验证，'local' 作为策略名称传递给 AuthGuard 类，这样，LocalAuthGuard 将使用 local 策略来处理身份验证。
//canActivate 方法是一个异步方法，用于决定是否允许当前请求继续执行。
//context 是 ExecutionContext 类型的参数，它提供了对当前请求的上下文的访问。ExecutionContext 是 NestJS 中的一个接口，允许你访问有关当前请求的信息，包括：
//	•	请求和响应对象：通常是 HttpRequest 和 HttpResponse 对象，具体取决于应用程序的传输层。
//	•	处理程序：正在处理当前请求的方法。
//	•	类实例：正在处理当前请求的控制器或提供者实例。
//canActivate 是守卫（Guard）类中的一个方法，它用于决定是否允许当前请求继续执行。当一个请求到达时，NestJS 会调用所有相关守卫的 canActivate 方法。如果所有守卫的 canActivate 方法都返回 true，则请求被允许继续执行；如果任何一个守卫的 canActivate 方法返回 false，则请求被拒绝，通常会返回一个 403 Forbidden 错误。
//super.canActivate(context) 调用了 AuthGuard 基类的 canActivate 方法，这是 @nestjs/passport 模块提供的一个守卫基类。这个方法处理了身份验证的初始逻辑，包括：
//	1.	提取 JWT token：从请求头中提取 JWT token（例如，使用 ExtractJwt.fromAuthHeaderAsBearerToken()）。
//	2.	验证 JWT token：使用提供的密钥验证 JWT token 的有效性和签名。
//	3.	提取用户信息：从 JWT token 中提取用户信息（例如，username 和 sub 字段）。
//	4.	调用策略的 validate 方法：如果 token 验证成功，会调用策略类的 validate 方法来进一步验证用户。
//通过调用 await super.canActivate(context)，你的守卫继承并执行了这些逻辑，确保请求中的 JWT token 是有效的，并且包含有效的用户信息。
