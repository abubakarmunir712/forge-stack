import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import type { ApiErrorResponse } from '@/common/types/api-error-response.type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

    const message = this.getMessage(exceptionResponse, statusCode);

    const errors = this.getErrors(exceptionResponse);

    const body: ApiErrorResponse = {
      success: false,
      statusCode,
      timestamp: new Date().toISOString(),
      message,
      ...(errors ? { errors } : {}),
    };

    response.status(statusCode).json(body);
  }

  private getMessage(exceptionResponse: unknown, statusCode: HttpStatus): string {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const message = exceptionResponse.message;

      if (typeof message === 'string') {
        return message;
      }

      if (Array.isArray(message)) {
        return 'Validation failed';
      }
    }

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      return 'Internal server error';
    }

    return 'Request failed';
  }

  private getErrors(exceptionResponse: unknown): unknown {
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const message = exceptionResponse.message;

      if (Array.isArray(message)) {
        return message;
      }
    }

    return undefined;
  }
}
