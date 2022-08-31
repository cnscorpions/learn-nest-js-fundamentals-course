import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // 1. get request response
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 2. extract data from exception
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    // 3. update response
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
