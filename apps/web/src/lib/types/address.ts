export interface Address {
  id: string;
  userId: string;
  label?: string | null;
  name?: string | null;
  phone?: string | null;
  address1: string;
  address2?: string | null;
  postalCode?: string | null;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  label?: string;
  name?: string;
  phone?: string;
  address1: string;
  address2?: string;
  postalCode?: string;
  isPrimary?: boolean;
}

export interface AddressResponse {
  data: Address;
  error?: never;
}

export interface AddressErrorResponse {
  data?: never;
  error: string;
}

export type AddressApiResponse = AddressResponse | AddressErrorResponse;
