import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ValidatePipe } from './common/pipes/validate.pipe';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块
    }),
    MongooseModule.forRoot(
      'mongodb://jinyuan:zzc19921014@localhost/nest?authSource=admin&useNewUrlParser=true&useUnifiedTopology=true',
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'jinyuan',
      password: 'zzc19921014',
      database: 'bqdatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, // 在生产环境中不要使用
      synchronize: false, // 在生产环境中使用
    }),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
  ],
  providers: [
    DatabaseService,
    {
      provide: APP_PIPE,
      useClass: ValidatePipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

//	•	GraphQLModule.forRoot<ApolloDriverConfig>({...})：配置 GraphQL 模块，指定 Apollo 驱动程序，并设置自动生成的 schema 文件路径。
//	•	autoSchemaFile：自动生成的 schema 文件路径。
//如果不想关闭 CSRF 预防，可以将 csrfPrevention 设置为 true。那么，需要在请求头中添加 X-CSRF-Token 字段，值为 csrfToken。
//	•	APP_GUARD：NestJS 提供的一个标记，用于注册全局守卫。
//	•	useClass: AuthGuard：指定要使用的守卫类为 AuthGuard。
