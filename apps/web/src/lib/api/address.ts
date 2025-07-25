import apiClient from '@/lib/api/client';
import { Address, CreateAddressRequest, AddressApiResponse } from '@/lib/types/address';

// 주소 목록 조회
export const getAddresses = async (): Promise<Address[]> => {
  const response = await apiClient.get<{ data: Address[] }>('/addresses');
  return response.data.data;
};

// 주소 등록
export const createAddress = async (addressData: CreateAddressRequest): Promise<Address> => {
  const response = await apiClient.post<AddressApiResponse>('/addresses', addressData);

  if ('error' in response.data) {
    throw new Error(response.data.error);
  }

  return response.data.data;
};

// 주소 수정
export const updateAddress = async (
  id: string,
  addressData: Partial<CreateAddressRequest>
): Promise<Address> => {
  const response = await apiClient.patch<AddressApiResponse>(`/addresses/${id}`, addressData);

  if ('error' in response.data) {
    throw new Error(response.data.error);
  }

  return response.data.data;
};

// 주소 삭제
export const deleteAddress = async (id: string): Promise<void> => {
  await apiClient.delete(`/addresses/${id}`);
};
