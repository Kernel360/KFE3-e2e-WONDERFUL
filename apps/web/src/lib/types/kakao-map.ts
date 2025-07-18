import type { UserLocation } from './location';

// 카카오 맵 글로벌 타입 확장
declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
        InfoWindow: new (options: KakaoInfoWindowOptions) => KakaoInfoWindow;
        load: (callback: () => void) => void;
        event: {
          addListener: (
            target: any,
            type: string,
            handler: (mouseEvent: KakaoMouseEvent) => void
          ) => void;
        };
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

export interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

export interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
}

export interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
  getLevel: () => number;
  setLevel: (level: number) => void;
}

export interface KakaoMarkerOptions {
  position: KakaoLatLng;
}

export interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
  getPosition: () => KakaoLatLng;
  setPosition: (latlng: KakaoLatLng) => void;
}

export interface KakaoInfoWindowOptions {
  content: string;
}

export interface KakaoInfoWindow {
  open: (map: KakaoMap, marker: KakaoMarker) => void;
  close: () => void;
  setPosition: (latlng: KakaoLatLng) => void;
}

export interface KakaoMouseEvent {
  latLng: KakaoLatLng;
}

export interface KakaoGeocoder {
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: any[], status: string) => void
  ) => void;
}

export interface KakaoMapProps {
  location: UserLocation;
  onLocationSelect?: (location: UserLocation) => void;
  width?: string | number;
  height?: string | number;
  level?: number;
  showMarker?: boolean;
  showInfoWindow?: boolean;
  infoContent?: string;
  className?: string;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
}

export interface KakaoMapSignupProps {
  location: UserLocation;
  width?: string | number;
  height?: string | number;
  level?: number;
  showMarker?: boolean;
  showInfoWindow?: boolean;
  infoContent?: string;
  className?: string;
}
