import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';
import { map, type Observable } from 'rxjs';

import { SUCCESS_MESSAGE_KEY } from '@/common/constants/metadata-keys';
import type { ApiResponse } from '@/common/types/api-response.type';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    const message =
      this.reflector.get<string>(SUCCESS_MESSAGE_KEY, context.getHandler()) ?? 'Request successful';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        timestamp: new Date().toISOString(),
        message,
        data,
        meta: null,
      })),
    );
  }
}
