// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//读取元数据。
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
// import {ContextType} from

type ContextType = 'http' | 'graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    //•	使用 Reflector 实例从当前处理程序中获取角色元数据（即从 Roles 装饰器中设置的角色）。
    //•	context.getHandler() 返回当前处理程序（通常是控制器中的一个方法）。
    if (!requiredRoles) {
      return true;
    }
    //	•	如果没有为该处理程序定义角色元数据，则默认允许访问。

    console.log('requiredRoles in roles guards: ', requiredRoles);

    // const request = context.switchToHttp().getRequest();
    //获取当前 HTTP 请求对象。

    // console.log('request in roles guards: ', request);

    // const user = request.user;

    let user;
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      user = request.user;
    } else if (context.getType() === ('graphql' as ContextType)) {
      const ctx = GqlExecutionContext.create(context);
      user = ctx.getContext().req.user;
    }

    console.log('user in roles guards: ', user);

    if (!user) {
      console.log('User not found in request.');
      return false;
    }

    //获取请求中的用户对象。通常，这个用户对象会在身份验证过程中被添加到请求中。

    return requiredRoles.some((role) => user.roles?.includes(role));
    //检查用户是否具有所需的角色。如果用户的角色数组中包含至少一个所需角色，则允许访问。
  }
}
