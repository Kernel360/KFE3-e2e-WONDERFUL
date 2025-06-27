// 로그인 관련 타입 정의
export interface SigninFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// 회원가입 관련 타입 정의
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

// 통합 폼 데이터 타입
export type AuthFormData = SigninFormData | SignupFormData;

// 폼 타입 구분
export type FormType = 'signin' | 'signup';

// 에러 타입
export type AuthErrorType =
  | 'invalid_account'
  | 'password_mismatch'
  | 'email_exists'
  | 'validation_error'
  | null;

// 폼 Props 타입
export interface AuthFormProps<T extends AuthFormData = AuthFormData> {
  formType: FormType;
  onSubmit?: (data: T) => void;
  onToggleForm?: () => void;
  initialData?: Partial<T>;
  isLoading?: boolean;
}

// 개별 폼 Props
export interface SigninFormProps {
  onSubmit?: (data: SigninFormData) => void;
  onToggleForm?: () => void;
  initialData?: Partial<SigninFormData>;
  isLoading?: boolean;
}

export interface SignupFormProps {
  onSubmit?: (data: SignupFormData) => void;
  onToggleForm?: () => void;
  initialData?: Partial<SignupFormData>;
  isLoading?: boolean;
}

// 폼 필드 설정 타입
export interface FormFieldConfig {
  id: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: 'user' | 'email' | 'lock';
  validation?: (value: string) => string | null;
}

// 폼 설정 타입
export interface FormConfig {
  title: string;
  fields: FormFieldConfig[];
  submitText: string;
  footerText?: string;
  footerLinkText?: string;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showTermsAgreement?: boolean;
}
