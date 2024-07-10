import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Global()
@Module({
  imports: [
    UserModule,
    //引入 UserModule 以便 AuthService 可以使用 UsersService 进行用户查找和验证。
    PassportModule,
    // PassportModule 初始化 passport.js并将其集成到 Nest.js 应用中，使得可以在应用中使用 Passport.js 的策略和认证机制。
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      //导入 ConfigModule
      inject: [ConfigService],
      //注入 ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        //从配置文件中获取 JWT_SECRET
        signOptions: { expiresIn: '60m' },
        //设置 token 过期时间
      }),
      //使用工厂模式创建 JWT 配置
    }),
    //使用JwtModule.registerAsync()方法注册 JWT 模块以便于在JwtService中使用
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    AuthResolver,
    JwtAuthGuard,
    LocalAuthGuard,
  ],
  exports: [AuthService, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}

//引入 UsersModule 以便 AuthService 可以使用 UsersService 进行用户查找和验证。
//配置 JwtModule 来处理 JWT 的生成和验证。
//注册 AuthService 和 JwtStrategy 作为提供者，以便在应用的其他部分使用。
// JwtModule.registerAsync()生成的配置对象供JwtService使用，在auth.service.ts中的login方法中使用JwtService生成token。
