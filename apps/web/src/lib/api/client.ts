// HTTP 클라이언트 설정 (업데이트된 버전)
// API 요청을 처리하는 Axios 클라이언트를 설정하는 파일
// apps/web/src/lib/api/client.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// 1️⃣ 환경 별 API URL 설정
// =========================================
// 개발환경: 상대경로 '/api' (Next.js API Routes)
// 프로덕션: 환경변수 또는 현재 도메인의 '/api'
const getBaseURL = (): string => {
  // 서버 사이드에서 실행 중인 경우 (SSR/API Routes)
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || 'http://localhost:3001/api';
  }

  // 클라이언트 사이드에서 실행 중인 경우
  if (process.env.NODE_ENV === 'development') {
    return '/api'; // 개발환경: 상대경로
  }

  // 프로덕션: 환경변수가 있으면 사용, 없으면 현재 도메인 기준
  return process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
};

// 2️⃣ Axios 인스턴스 생성 및 설정
const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000, // 15초 타임아웃 (파일 업로드 고려)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3️⃣ 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 개발 환경에서만 API 요청 로그 출력
    if (process.env.NODE_ENV === 'development') {
      const method = config.method?.toUpperCase();
      const url = config.url;
      const baseURL = config.baseURL;

      console.group(`🚀 API Request: ${method} ${url}`);
      console.log('Full URL:', `${baseURL}${url}`);

      if (config.params) {
        console.log('Query Params:', config.params);
      }

      if (config.data && config.headers.get('Content-Type') !== 'multipart/form-data') {
        console.log('Request Data:', config.data);
      }

      console.groupEnd();
    }

    // fetch 캐시 방지를 위한 헤더 추가(Next.js 15)
    if (!config.headers.get('Cache-Control')) {
      config.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      config.headers.set('Pragma', 'no-cache');
      config.headers.set('Expires', '0');
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ 요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 4️⃣ 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 개발 환경에서만 API 응답 로그 출력
    if (process.env.NODE_ENV === 'development') {
      const method = response.config.method?.toUpperCase();
      const url = response.config.url;
      const status = response.status;

      console.group(`✅ API Response: ${method} ${url} (${status})`);
      console.log('Status:', status, response.statusText);
      console.log('Headers:', response.headers);

      // 응답 데이터가 너무 크지 않을 때만 로그 출력
      if (response.data && JSON.stringify(response.data).length < 1000) {
        console.log('Response Data:', response.data);
      } else if (response.data) {
        console.log('Large Response Data');
      }

      console.groupEnd();
    }

    return response;
  },
  (error: AxiosError) => {
    // 에러 응답 처리
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.url;
    const status = error.response?.status;

    if (process.env.NODE_ENV === 'development') {
      console.group(`❌ API Error: ${method} ${url} (${status})`);
      console.error('Error Config:', error.config);
      console.error('Error Response:', error.response?.data);
      console.error('Error Message:', error.message);
      console.groupEnd();
    } else {
      // 운영 환경에서는 민감한 정보 노출 방지
      console.error(`API Error: ${status} - ${error.message}`);
    }

    // 에러 응답 데이터 정규화
    const responseData = error.response?.data as unknown;
    const errorData = {
      status: status || 0,
      message:
        ((responseData as Record<string, unknown>)?.message as string) ||
        error.message ||
        '알 수 없는 오류가 발생했습니다.',
      code:
        ((responseData as Record<string, unknown>)?.code as string) ||
        error.code ||
        'UNKNOWN_ERROR',
      details: (responseData as Record<string, unknown>)?.details || null,
    };

    // 에러 객체에 정규화된 데이터 추가
    error.response = {
      ...error.response,
      data: errorData,
    } as any;

    return Promise.reject(error);
  }
);

// 5️⃣ API 유틸리티 함수들
// ========================================
// 기본 API 함수들(GET, POST, PUT, PATCH, DELETE) 요청을 위한 헬퍼 함수들
export const api = {
  // GET 요청
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  // POST 요청
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  // PUT 요청
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  // PATCH 요청
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.patch<T>(url, data, config);
  },

  // DELETE 요청
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  },

  // 파일 업로드 (multipart/form-data)
  upload: <T = any>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
      timeout: 30000, // 파일 업로드는 더 긴 타임아웃
    });
  },
};

// 6️⃣ 에러 처리 유틸리티
// ========================================
// API 에러를 사용자 친화적인 메시지로 변환
export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

// 네트워크 에러 여부 확인
export const isNetworkError = (error: any): boolean => {
  return !error?.response && error?.code === 'ERR_NETWORK';
};

// 타임아웃 에러 여부 확인
export const isTimeoutError = (error: any): boolean => {
  return error?.code === 'ECONNABORTED' || error?.message?.includes('timeout');
};

/// 특정 HTTP 상태 코드 에러 여부 확인
export const isStatusError = (error: any, status: number): boolean => {
  return error?.response?.status === status;
};

// 개발용 유틸리티
// ========================================
// 개발 환경에서만 API 요청 상세 로그 활성화/비활성화
export const setDebugMode = (enabled: boolean) => {
  if (process.env.NODE_ENV === 'development') {
    (window as any).__API_DEBUG__ = enabled;
  }
};

export default apiClient;
