export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  timestamp: string;
  message: string;
  errors?: unknown;
};
