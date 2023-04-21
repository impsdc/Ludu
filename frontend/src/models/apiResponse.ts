export interface messageError {
  property: string;
  constraints: string;
  [key: string]: string;
}
export interface apiErrorResponse {
  statusCode: number;
  message: messageError[];
  error: string;
}
