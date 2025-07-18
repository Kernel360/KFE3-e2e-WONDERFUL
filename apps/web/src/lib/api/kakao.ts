import type {
  KakaoSearchResponse,
  KakaoGeocodingResponse,
  SearchResultItem,
} from '@/lib/types/location';

// 공통 에러 처리
class KakaoApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'KakaoApiError';
  }
}

// API 키 검증
const validateApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!apiKey) {
    throw new KakaoApiError('Kakao REST API 키가 설정되지 않았습니다.');
  }
  return apiKey;
};

// 공통 fetch 함수
const kakaoFetch = async (url: string): Promise<any> => {
  const apiKey = validateApiKey();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new KakaoApiError(
      `카카오 API 호출 실패: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  return response.json();
};

// 주소 포맷팅 유틸리티
const formatAddressDisplay = (region1: string, region2: string, region3: string): string => {
  const formatRegion1 = region1.replace('특별시', '시').replace('광역시', '시');
  return `${formatRegion1} ${region2} ${region3}`;
};

/**
 * 카카오 REST API를 사용하여 주소 검색
 */
export const searchAddressByKeyword = async (query: string): Promise<SearchResultItem[]> => {
  try {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}&size=15`;
    const data: KakaoSearchResponse = await kakaoFetch(url);

    if (!data.documents || data.documents.length === 0) {
      return [];
    }

    return data.documents.map((doc, index) => ({
      id: `${doc.x}_${doc.y}_${index}`,
      address_name: doc.address_name,
      road_address_name: doc.road_address?.address_name,
      latitude: parseFloat(doc.y),
      longitude: parseFloat(doc.x),
      region_1depth_name: doc.address.region_1depth_name,
      region_2depth_name: doc.address.region_2depth_name,
      region_3depth_name: doc.address.region_3depth_name,
      display_name: formatAddressDisplay(
        doc.address.region_1depth_name,
        doc.address.region_2depth_name,
        doc.address.region_3depth_name
      ),
    }));
  } catch (error) {
    if (error instanceof KakaoApiError) {
      throw error;
    }
    throw new KakaoApiError('카카오 주소 검색 실패');
  }
};

/**
 * 좌표를 "시 구 동" 형태 주소로 변환
 */
export const convertCoordinatesToDisplayAddress = async (
  longitude: number,
  latitude: number
): Promise<string> => {
  try {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
    const data: KakaoGeocodingResponse = await kakaoFetch(url);

    if (data.meta.total_count === 0 || !data.documents || data.documents.length === 0) {
      return '주소 정보 없음';
    }

    const addressInfo = data.documents[0];
    if (!addressInfo) {
      return '주소 정보 없음';
    }

    // 행정구역 정보 추출
    const region1 = addressInfo.address?.region_1depth_name || '';
    const region2 = addressInfo.address?.region_2depth_name || '';
    const region3 = addressInfo.address?.region_3depth_name || '';

    if (region1 && region2 && region3) {
      return formatAddressDisplay(region1, region2, region3);
    }

    // 도로명 주소나 지번 주소로 폴백
    if (addressInfo.road_address?.address_name) {
      return addressInfo.road_address.address_name;
    } else if (addressInfo.address?.address_name) {
      return addressInfo.address.address_name;
    } else if (addressInfo.address_name) {
      return addressInfo.address_name;
    }

    return '주소 정보 없음';
  } catch (error) {
    if (error instanceof KakaoApiError) {
      throw error;
    }
    throw new KakaoApiError('카카오 주소 변환 실패');
  }
};

/**
 * 카카오 맵 API 키 검증 (맵 컴포넌트용)
 */
export const validateMapApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
  if (!apiKey) {
    throw new KakaoApiError('Kakao Map API 키가 설정되지 않았습니다.');
  }
  return apiKey;
};

// 에러 타입 export
export { KakaoApiError };
