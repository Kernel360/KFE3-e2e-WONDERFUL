// src/lib/api/kakao-geocoding.ts
interface KakaoGeocodingResponse {
  meta: {
    total_count: number;
  };
  documents: KakaoAddressDocument[];
}

interface KakaoAddressDocument {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: KakaoAddress;
  road_address?: KakaoRoadAddress;
}

interface KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  zip_code: string;
}

interface KakaoRoadAddress {
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
}

/**
 * 카카오 REST API를 사용하여 좌표를 주소로 변환
 * @param longitude 경도
 * @param latitude 위도
 * @returns 주소 정보
 */
export const convertCoordinatesToAddress = async (
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

    const data: KakaoGeocodingResponse = await response.json();

    if (data.meta.total_count === 0 || !data.documents || data.documents.length === 0) {
      return '주소 정보 없음';
    }

    const addressInfo = data.documents[0];

    if (!addressInfo) {
      return '주소 정보 없음';
    }

    // 도로명 주소가 있으면 우선 사용, 없으면 지번 주소 사용
    if (addressInfo.road_address?.address_name) {
      return addressInfo.road_address.address_name;
    } else if (addressInfo.address?.address_name) {
      return addressInfo.address.address_name;
    } else if (addressInfo.address_name) {
      return addressInfo.address_name;
    } else {
      return '주소 정보 없음';
    }
  } catch (error) {
    console.error('❌ 카카오 주소 변환 실패:', error);
    return '주소 변환 실패';
  }
};
