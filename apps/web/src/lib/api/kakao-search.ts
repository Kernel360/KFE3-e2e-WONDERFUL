// lib/api/kakao-search.ts

interface KakaoSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoSearchDocument[];
}

interface KakaoSearchDocument {
  address_name: string;
  address_type: string;
  x: string; // 경도
  y: string; // 위도
  address: {
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
  };
  road_address?: {
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
  };
}

export interface SearchResultItem {
  id: string;
  address_name: string;
  road_address_name?: string;
  latitude: number;
  longitude: number;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  display_name: string; // 표시용 주소 (시 구 동 형태)
}

/**
 * 주소를 "시 구 동" 형태로 변환
 */
const formatAddressDisplay = (region1: string, region2: string, region3: string): string => {
  // "서울특별시" -> "서울시", "경기도" -> "경기도" 등으로 정리
  const formatRegion1 = region1.replace('특별시', '시').replace('광역시', '시');

  return `${formatRegion1} ${region2} ${region3}`;
};

/**
 * 카카오 REST API를 사용하여 주소 검색
 * @param query 검색어
 * @returns 검색 결과 리스트
 */
export const searchAddressByKeyword = async (query: string): Promise<SearchResultItem[]> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!apiKey) {
      console.error('NEXT_PUBLIC_KAKAO_REST_API_KEY가 설정되지 않았습니다.');
      throw new Error('Kakao REST API 키가 설정되지 않았습니다.');
    }

    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}&size=15`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(`카카오 API 호출 실패: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: KakaoSearchResponse = await response.json();
    console.log('카카오 검색 결과:', data);

    if (!data.documents || data.documents.length === 0) {
      return [];
    }

    // 검색 결과를 우리 인터페이스에 맞게 변환
    return data.documents.map((doc, index) => ({
      id: `${doc.x}_${doc.y}_${index}`, // 고유 ID 생성
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
    console.error('카카오 주소 검색 실패:', error);
    throw error;
  }
};

/**
 * 좌표를 "시 구 동" 형태 주소로 변환
 * @param longitude 경도
 * @param latitude 위도
 * @returns "서울시 서초구 서초동" 형태의 주소
 */
export const convertCoordinatesToDisplayAddress = async (
  longitude: number,
  latitude: number
): Promise<string> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!apiKey) {
      throw new Error('Kakao REST API 키가 설정되지 않았습니다.');
    }

    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();

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
    console.error('카카오 주소 변환 실패:', error);
    return '주소 변환 실패';
  }
};
