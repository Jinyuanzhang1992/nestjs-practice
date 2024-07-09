import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const isGraphQL = host.getType().toString() === 'graphql';
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: isGraphQL
        ? gqlHost.getInfo().fieldName
        : host.switchToHttp().getRequest().url,
      message: exception.message,
    };

    console.error('Exception caught by filter:', response);

    if (isGraphQL) {
      throw exception; // 让 Apollo Server 处理 GraphQL 异常
    } else {
      const ctx = host.switchToHttp();
      const httpResponse = ctx.getResponse();
      if (!httpResponse.headersSent) {
        httpResponse.status(status).json(response);
      }
    }
  }
}

//确保过滤器适用于 GraphQL 请求和常规 HTTP 请求。在这个例子中，我们使用 GqlArgumentsHost.create(host) 来检查请求是否是 GraphQL 请求。
//graphql 采用的是一种不同的方式来处理异常，所以我们需要让 Apollo Server 处理 GraphQL 异常。
//为什么？因为 GraphQL 请求的异常处理方式与常规 HTTP 请求不同。在 GraphQL 请求中，异常会被 Apollo Server 捕获并返回给客户端。
//传统http的错误处理方式是通过httpResponse.status(status).json(response)返回给客户端，而GraphQL的错误处理方式是通过throw exception抛出异常给Apollo Server处理。
