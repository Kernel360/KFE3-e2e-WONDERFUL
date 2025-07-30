export interface Address {
  id: string;
  userId: string;
  label?: string | null;
  userName?: string | null;
  phone?: string | null;
  address: string;
  addressDetail?: string | null;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  label?: string;
  userName?: string;
  phone?: string;
  address: string;
  addressDetail?: string;
  isPrimary?: boolean;
}

export interface AddressListItem {
  id: string;
  userName: string;
  address: string;
  phone: string;
  isPrimary: boolean;
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
