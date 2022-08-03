export interface ErrorMessage {
  message: string;
  code?: number;
  stack?: string;
}

export interface SuccessMessage {
  type: string;
  message: string;
  transactionHash: string;
}
