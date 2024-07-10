import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard, RolesGuard)
  // RolesGuard
  //使用 LocalAuthGuard 本地验证守卫来保护登陆路由
  @Roles(Role.Admin, Role.Student, Role.Teacher)
  //Role.Student, Role.Teacher
  @Post('login')
  //Post() 装饰器用于创建一个 POST 请求的路由
  async login(@Request() req) {
    const token = await this.authService.login(req.user);
    const user = req.user;
    return { user, token };
  }
  //调用 AuthService 的 login() 方法，传入 req.user 作为参数生成并返回 token
}
//	•	使用 @UseGuards(LocalAuthGuard) 来保护 login 路由，这个守卫会在请求到达控制器之前验证用户身份。
//	•	使用 @Post('login') 装饰器来创建一个 POST 请求的路由。
//	•	在 login() 方法中调用 AuthService 的 login() 方法，传入 req.user 作为参数生成并返回 token。
