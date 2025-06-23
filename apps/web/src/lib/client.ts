// HTTP 클라이언트 설정
// API 요청을 처리하는 Axios 클라이언트를 설정하는 파일
// Axios: Promise 기반의 HTTP 클라이언트로, 브라우저와 Node.js에서 모두 사용 가능
// 이 설정은 API 요청의 기본 URL, 타임아웃, 및 요청/응답 인터셉터를 포함
import axios from 'axios';

// 환경별 API URL 설정
const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api' // 개발환경: 상대경로
    : process.env.NEXT_PUBLIC_API_BASE_URL || '/api'; // 프로덕션: 환경변수

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  // 요청 전 처리
  console.log('API 요청:', config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 에러:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
