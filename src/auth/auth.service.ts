import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //验证用户
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    //返回剔除掉密码的用户信息

    return null;
    //返回null表示验证失败
  }

  //登陆
  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }
  //登陆成功后，生成一个token，返回给前端
}
