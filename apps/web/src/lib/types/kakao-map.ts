export interface UserLocation {
  latitude: number;
  longitude: number;
}

// 카카오맵 관련 Window 타입 확장
declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
        InfoWindow: new (options: KakaoInfoWindowOptions) => KakaoInfoWindow;
        event: {
          addListener: (target: any, type: string, handler: Function) => void;
          removeListener: (target: any, type: string, handler: Function) => void;
        };
        load: (callback: () => void) => void;
        services: {
          Geocoder: new () => KakaoGeocoder;
          Status: {
            OK: string;
            ZERO_RESULT: string;
            ERROR: string;
          };
        };
      };
    };
  }
}

// 카카오맵 좌표 타입
export interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

// 카카오맵 옵션 타입
export interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
  mapTypeId?: any;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
  projectId?: string;
}

// 카카오맵 인스턴스 타입
export interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
  getCenter: () => KakaoLatLng;
  setLevel: (level: number, animate?: boolean) => void;
  getLevel: () => number;
  setBounds: (bounds: any) => void;
  getBounds: () => any;
  setDraggable: (draggable: boolean) => void;
  getDraggable: () => boolean;
  setZoomable: (zoomable: boolean) => void;
  getZoomable: () => boolean;
  relayout: () => void;
  addOverlayMapTypeId: (mapTypeId: any) => void;
  removeOverlayMapTypeId: (mapTypeId: any) => void;
  setMapTypeId: (mapTypeId: any) => void;
  getMapTypeId: () => any;
  getProjection: () => any;
}

// 카카오맵 마커 옵션 타입
export interface KakaoMarkerOptions {
  position: KakaoLatLng;
  image?: any;
  title?: string;
  draggable?: boolean;
  clickable?: boolean;
  zIndex?: number;
  opacity?: number;
  range?: number;
}

// 카카오맵 마커 타입
export interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
  getMap: () => KakaoMap | null;
  setPosition: (position: KakaoLatLng) => void;
  getPosition: () => KakaoLatLng;
  setImage: (image: any) => void;
  getImage: () => any;
  setTitle: (title: string) => void;
  getTitle: () => string;
  setDraggable: (draggable: boolean) => void;
  getDraggable: () => boolean;
  setClickable: (clickable: boolean) => void;
  getClickable: () => boolean;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;
  setOpacity: (opacity: number) => void;
  getOpacity: () => number;
  setRange: (range: number) => void;
  getRange: () => number;
}

// 카카오맵 정보창 옵션 타입
export interface KakaoInfoWindowOptions {
  content: string;
  position?: KakaoLatLng;
  removable?: boolean;
  zIndex?: number;
  altitude?: number;
  range?: number;
  disableAutoPan?: boolean;
}

// 카카오맵 정보창 타입
export interface KakaoInfoWindow {
  open: (map: KakaoMap, marker?: KakaoMarker) => void;
  close: () => void;
  getMap: () => KakaoMap | null;
  setPosition: (position: KakaoLatLng) => void;
  getPosition: () => KakaoLatLng;
  setContent: (content: string) => void;
  getContent: () => string;
  setZIndex: (zIndex: number) => void;
  getZIndex: () => number;
  setAltitude: (altitude: number) => void;
  getAltitude: () => number;
  setRange: (range: number) => void;
  getRange: () => number;
}

// 카카오맵 지오코더 타입
export interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: KakaoGeocoderResult[], status: string) => void,
    options?: any
  ) => void;
  coord2RegionCode: (
    lng: number,
    lat: number,
    callback: (result: any[], status: string) => void
  ) => void;
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: KakaoGeocoderResult[], status: string) => void,
    options?: any
  ) => void;
}

// 카카오맵 지오코더 결과 타입 (기존 signup 컴포넌트와 동일)
export interface KakaoGeocoderResult {
  address_name: string;
  address_type: string;
  x: string; // 경도
  y: string; // 위도
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    h_code?: string;
    b_code?: string;
    mountain_yn?: string;
    main_address_no?: string;
    sub_address_no?: string;
    x?: string;
    y?: string;
  };
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn?: string;
    main_building_no?: string;
    sub_building_no?: string;
    building_name?: string;
    zone_no?: string;
    x?: string;
    y?: string;
  };
}

// 기존 signup 컴포넌트용 KakaoMap Props (기본형)
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

// 새로운 location 컴포넌트용 KakaoMap Props (확장형)
export interface KakaoMapProps extends KakaoMapSignupProps {
  onLocationSelect?: (location: UserLocation) => void;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
}

// 마우스 이벤트 타입
export interface KakaoMouseEvent {
  latLng: KakaoLatLng;
  point: {
    x: number;
    y: number;
  };
}

// 지도 이벤트 타입
export type KakaoMapEventType =
  | 'click'
  | 'dblclick'
  | 'rightclick'
  | 'mousemove'
  | 'mousedown'
  | 'mouseup'
  | 'mouseover'
  | 'mouseout'
  | 'center_changed'
  | 'zoom_start'
  | 'zoom_changed'
  | 'bounds_changed'
  | 'idle'
  | 'tilesloaded'
  | 'dragstart'
  | 'dragend'
  | 'maptypeid_changed';

// 마커 이벤트 타입
export type KakaoMarkerEventType = 'click' | 'mouseover' | 'mouseout' | 'dragstart' | 'dragend';

// 유틸리티 타입들
export interface MapBounds {
  sw: UserLocation; // 남서쪽 좌표
  ne: UserLocation; // 북동쪽 좌표
}

export interface MapSize {
  width: number;
  height: number;
}

// 호환성을 위한 기존 타입 별칭들
export type { KakaoMapSignupProps as KakaoMapComponentProps };
