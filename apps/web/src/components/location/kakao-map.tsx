'use client';

import React, { useEffect, useRef, useState } from 'react';

import type {
  UserLocation,
  KakaoMapProps,
  KakaoMap as KakaoMapType,
  KakaoMarker,
  KakaoInfoWindow,
  KakaoMouseEvent,
} from '@/lib/types/kakao-map';

const KakaoMap = ({
  location,
  onLocationSelect,
  width = '100%',
  height = '200px',
  level = 3,
  showMarker = true,
  showInfoWindow = false,
  infoContent = '현재 위치',
  className = '',
  draggable = true,
  scrollwheel = true,
  disableDoubleClick = false,
  disableDoubleClickZoom = false,
}: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMapType | null>(null);
  const markerRef = useRef<KakaoMarker | null>(null);
  const infoWindowRef = useRef<KakaoInfoWindow | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string>('');

  // 지도 중심과 마커 업데이트 함수
  const updateMapCenter = (newLocation: UserLocation) => {
    if (mapRef.current && markerRef.current && window.kakao && window.kakao.maps) {
      const newCenter = new window.kakao.maps.LatLng(newLocation.latitude, newLocation.longitude);
      mapRef.current.setCenter(newCenter);
      markerRef.current.setPosition(newCenter);
    }
  };

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
      updateMapCenter(location);
    }
  }, [location, isMapLoaded]);

  // Kakao Map 초기화
  const initializeMap = () => {
    if (!mapContainer.current || !window.kakao || !location) return;

    try {
      const options = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: level,
        draggable,
        scrollwheel,
        disableDoubleClick,
        disableDoubleClickZoom,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      mapRef.current = map;

      if (showMarker) {
        const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
        markerRef.current = marker;

        if (showInfoWindow) {
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${infoContent}</div>`,
          });

          infowindow.open(map, marker);
          infoWindowRef.current = infowindow;
        }
      }

      // 지도 클릭 이벤트 추가 (위치 선택 가능한 경우)
      if (onLocationSelect) {
        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: KakaoMouseEvent) => {
          const latlng = mouseEvent.latLng;
          const newLocation: UserLocation = {
            latitude: latlng.getLat(),
            longitude: latlng.getLng(),
          };

          // 마커 위치 업데이트
          if (markerRef.current) {
            markerRef.current.setPosition(latlng);
          }

          // 정보창 위치 업데이트
          if (infoWindowRef.current && showInfoWindow) {
            infoWindowRef.current.setPosition(latlng);
          }

          onLocationSelect(newLocation);
        });
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
        className={`flex items-center justify-center rounded-lg bg-red-50 ${className}`}
        style={{ width, height }}
      >
        <p className="text-sm text-red-600">{mapError}</p>
      </div>
    );
  }

  return (
    <div ref={mapContainer} className={`bg-neutral-100 ${className}`} style={{ width, height }} />
  );
};

export default KakaoMap;
