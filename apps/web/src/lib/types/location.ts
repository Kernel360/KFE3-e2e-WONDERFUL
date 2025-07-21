export interface Location {
  location_name: string;
  latitude: number;
  longitude: number;
  is_primary: boolean;
}

export interface UserLocation {
  latitude: number; //위도
  longitude: number; //경도
}

export interface SearchResultItem {
  id: string; //고유id
  address_name: string; //지번 주소
  road_address_name?: string; // 도로명 주소
  latitude: number; //위도
  longitude: number; //경도
  region_1depth_name: string; // 시/도
  region_2depth_name: string; // 구/군
  region_3depth_name: string; // 동/면
  display_name: string; // ''xx시 xx구 xx동
  place_name?: string;
  category_name?: string;
}

export interface GeolocationState {
  location: UserLocation | null;
  address: string;
  error: string;
  isLoading: boolean;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  autoFetchAddress?: boolean;
}

// 카카오 API 관련 타입들
export interface KakaoSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoSearchDocument[];
}

export interface KakaoSearchDocument {
  address_name: string;
  address_type: string;
  x: string; // 경도
  y: string; // 위도
  address: KakaoAddress;
  road_address?: KakaoRoadAddress;
}

export interface KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

export interface KakaoRoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}

export interface KakaoGeocodingResponse {
  meta: {
    total_count: number;
  };
  documents: KakaoAddressDocument[];
}

export interface KakaoAddressDocument {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: KakaoAddress;
  road_address?: KakaoRoadAddress;
}
