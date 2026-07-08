export type ApiResponse<TData = unknown, TMeta = unknown> = {
  success: boolean;
  message: string;
  data: TData;
  meta: TMeta | null;
  timestamp: string;
  statusCode: number;
};
