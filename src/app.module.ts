import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthGuard } from './common/auth/auth.guards';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ValidatePipe } from './common/pipes/validate.pipe';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // csrfPrevention: false, // 关闭 CSRF 预防
    }),
  ],
  providers: [
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
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
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
