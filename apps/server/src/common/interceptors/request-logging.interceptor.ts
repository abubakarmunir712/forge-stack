import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import type { Request, Response } from 'express';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();

    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const startedAt = Date.now();

    const method = request.method;
    const url = request.originalUrl;
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];

    this.logger.info('Incoming request', {
      method,
      url,
      ip,
      userAgent,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.info('Request completed', {
          method,
          url,
          statusCode: response.statusCode,
          durationMs: Date.now() - startedAt,
        });
      }),
      catchError((error: unknown) => {
        this.logger.info('Request Failed', {
          method,
          url,
          statusCode: response.statusCode,
          durationMs: Date.now() - startedAt,
        });
        return throwError(() => error);
      }),
    );
  }
}
