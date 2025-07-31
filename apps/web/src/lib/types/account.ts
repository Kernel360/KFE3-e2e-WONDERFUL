export interface Account {
  id: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isPrimary?: boolean;
}

export interface AccountResponse {
  data: Account;
  error?: never;
}

export interface AccountErrorResponse {
  data?: never;
  error: string;
}

export type AccountApiResponse = AccountResponse | AccountErrorResponse;
