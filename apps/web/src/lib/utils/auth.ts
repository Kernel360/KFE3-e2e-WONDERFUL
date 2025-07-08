import {
  AuthErrorType,
  FormConfig,
  FormType,
  SigninFormData,
  SignupFormData,
} from '@/lib/types/auth';

// 유효성 검사 함수들
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return '이메일을 입력해주세요.';
  if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return '사용자명을 입력해주세요.';
  if (username.length < 3) return '사용자명은 3자 이상이어야 합니다.';
  return null;
};

// 로그인 검증 함수
export const validateSignin = (
  data: SigninFormData
): { isValid: boolean; error: AuthErrorType; fieldError?: string } => {
  // 이메일 유효성 검사
  const emailError = validateEmail(data.email);
  if (emailError) {
    return { isValid: false, error: 'validation_error', fieldError: emailError };
  }

  // 비밀번호 유효성 검사
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    return { isValid: false, error: 'validation_error', fieldError: passwordError };
  }

  return { isValid: true, error: null };
};

// 회원가입 검증 함수
export const validateSignup = (
  data: SignupFormData
): { isValid: boolean; error: AuthErrorType; fieldError?: string } => {
  // 이메일 중복 체크
  if (!data.name) {
    return { isValid: false, error: 'email_exists', fieldError: '이미 사용 중인 이메일입니다.' };
  }

  // 기본 유효성 검사 (이름은 빈 값만 체크)
  const emailError = validateEmail(data.email);
  const passwordError = validatePassword(data.password);

  // 구체적인 필드 에러 반환
  if (!data.name) {
    return { isValid: false, error: 'validation_error', fieldError: '이름을 입력해주세요.' };
  }

  if (emailError) {
    return { isValid: false, error: 'validation_error', fieldError: emailError };
  }

  if (passwordError) {
    return { isValid: false, error: 'validation_error', fieldError: passwordError };
  }

  return { isValid: true, error: null };
};

export const getAuthErrorMessage = (
  error: AuthErrorType,
  formType: FormType,
  fieldError?: string
): string => {
  if (fieldError) {
    return fieldError;
  }

  switch (error) {
    case 'invalid_account':
      return '계정 정보가 올바르지 않습니다.';
    case 'password_mismatch':
      return '비밀번호가 일치하지 않습니다.';
    case 'email_exists':
      return '이미 사용 중인 이메일입니다.';
    case 'validation_error':
      return formType === 'signup'
        ? '입력 정보를 다시 확인해주세요.'
        : '모든 필드를 올바르게 입력해주세요.';
    default:
      return '';
  }
};

export const getFormConfig = (formType: FormType): FormConfig => {
  if (formType === 'signin') {
    return {
      title: '로그인',
      fields: [
        {
          id: 'email',
          type: 'email',
          placeholder: 'Enter email',
          icon: 'email',
          validation: validateEmail,
        },
        {
          id: 'password',
          type: 'password',
          placeholder: 'Enter password',
          icon: 'lock',
          validation: validatePassword,
        },
      ],
      submitText: 'Login',
      footerText: '계정이 없으신가요?',
      footerLinkText: '회원 가입',
      showRememberMe: true,
      showForgotPassword: true,
      showTermsAgreement: false,
    };
  }

  return {
    title: '회원 가입',
    fields: [
      {
        id: 'name',
        type: 'text',
        placeholder: 'myname',
        icon: 'user',
      },
      {
        id: 'email',
        type: 'email',
        placeholder: 'myname@gmail.com',
        icon: 'email',
        validation: validateEmail,
      },
      {
        id: 'password',
        type: 'password',
        placeholder: '••••••••••',
        icon: 'lock',
        validation: validatePassword,
      },
    ],
    submitText: '회원 가입',
    footerText: '계정이 있으신가요?',
    footerLinkText: '로그인',
    showRememberMe: false,
    showForgotPassword: false,
    showTermsAgreement: true,
  };
};

export const getInitialFormData = (formType: FormType) => {
  if (formType === 'signin') {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  }
  return {
    name: '',
    email: '',
    password: '',
  };
};
