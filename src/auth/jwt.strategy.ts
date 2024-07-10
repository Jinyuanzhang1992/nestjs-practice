import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //从请求头中获取 token，token 里面包含了 payload
      ignoreExpiration: false,
      //是否忽略 token 过期时间
      secretOrKey: configService.get<string>('JWT_SECRET'),
      //从配置文件中获取 secret，并且用 secret 来验证 token
    });
  }

  //验证 token
  async validate(payload: JwtPayload) {
    console.log('payload:', payload);
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
  //验证通过后，返回一个对象，这个对象会被注入到请求中
}
//	•	定义 JWT 策略，用于验证和解码 JWT。
//使用 Passport 进行身份验证，当请求携带 JWT 时，解码并验证其有效性。
//	•	如果 JWT 有效，将用户信息附加到请求对象上。
