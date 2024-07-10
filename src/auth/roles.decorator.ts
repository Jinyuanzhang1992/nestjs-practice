// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// /Roles 装饰器接受任意数量的角色字符串参数，并将这些角色作为元数据附加到被装饰的路由处理程序上。稍后，在守卫中可以通过反射机制读取这些元数据，以确定当前请求是否具备访问权限。
