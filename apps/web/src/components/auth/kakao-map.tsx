'use client';

import React, { useEffect, useRef, useState } from 'react';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface KakaoMapProps {
  location: UserLocation;
  width?: string | number;
  height?: string | number;
  level?: number;
  showMarker?: boolean;
  showInfoWindow?: boolean;
  infoContent?: string;
  className?: string;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
        InfoWindow: new (options: KakaoInfoWindowOptions) => KakaoInfoWindow;
        load: (callback: () => void) => void;
        services: {
          Geocoder: new () => KakaoGeocoder;
          Status: {
            OK: string;
          };
        };
      };
    };
  }
}

interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
  getLevel: () => number;
  setLevel: (level: number) => void;
}

interface KakaoMarkerOptions {
  position: KakaoLatLng;
}

interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
  getPosition: () => KakaoLatLng;
}

interface KakaoInfoWindowOptions {
  content: string;
}

interface KakaoInfoWindow {
  open: (map: KakaoMap, marker: KakaoMarker) => void;
  close: () => void;
}

interface KakaoGeocoder {
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: KakaoGeocoderResult[], status: string) => void
  ) => void;
}

interface KakaoGeocoderResult {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
  };
}

const KakaoMap = ({
  location,
  width = '100%',
  height = '200px',
  level = 3,
  showMarker = true,
  showInfoWindow = true,
  infoContent = '현재 위치',
  className = '',
}: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string>('');

  // Kakao Map API 스크립트 로드
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap();
        });
        return;
      }

      if (!process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY) {
        console.error('Kakao Map API 키가 설정되지 않았습니다.');
        setMapError('Kakao Map API 키가 설정되지 않았습니다.');
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;

      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };

      script.onerror = () => {
        console.error('Kakao Map API 로드 실패');
        setMapError('Kakao Map API 로드에 실패했습니다.');
      };

      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    if (!window.kakao) {
      loadKakaoMap();
    } else {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    }
  }, []);

  // 위치 변경시 지도 업데이트
  useEffect(() => {
    if (isMapLoaded && location && window.kakao) {
      initializeMap();
    }
  }, [location, isMapLoaded]);

  // Kakao Map 초기화
  const initializeMap = () => {
    if (!mapContainer.current || !window.kakao || !location) return;

    try {
      const options = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: level,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);

      if (showMarker) {
        const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        if (showInfoWindow) {
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${infoContent}</div>`,
          });

          infowindow.open(map, marker);
        }
      }

      setIsMapLoaded(true);
      setMapError('');
    } catch (error) {
      console.error('지도 초기화 중 오류:', error);
      setMapError('지도 초기화 중 오류가 발생했습니다.');
    }
  };

  if (mapError) {
    return (
      <div
        className={`bg-danger-50 flex items-center justify-center rounded-lg ${className}`}
        style={{ width, height }}
      >
        <p className="text-danger-600 text-sm">{mapError}</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className={`rounded-lg border ${className}`}
      style={{ width, height }}
    />
  );
};

export default KakaoMap;
