// 로그인 관련 타입 정의
export interface SigninFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// 회원가입 관련 타입 정의
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

//Server Action 결과 타입
export interface AuthActionResult {
  success: boolean;
  error?: string;
  message?: string;
  field?: 'email' | 'password' | 'name';
  redirectUrl?: string;
  user?: any;
}

//useFormState 초기 상태 타입
export interface FormActionState {
  success: boolean;
  error: string | null;
  message: string | null;
  field?: 'email' | 'password' | 'name';
}
