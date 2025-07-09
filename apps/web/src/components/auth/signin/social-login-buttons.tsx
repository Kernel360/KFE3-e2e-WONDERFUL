import Image from 'next/image';
import { FloatButton } from '@/components/ui/float-button';

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  googleLoading: boolean;
}

const SocialLoginButtons = ({ onGoogleLogin, googleLoading }: SocialLoginButtonsProps) => {
  return (
    <div className="mt-[40px] flex items-center justify-center gap-6 px-[98px]">
      <FloatButton
        variant="solid"
        color="secondary"
        size="medium"
        onClick={onGoogleLogin}
        disabled={googleLoading}
      >
        <Image
          src="/icon/Google.svg"
          alt="Google 로그인"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </FloatButton>

      <FloatButton variant="solid" color="secondary" size="medium">
        <Image
          src="/icon/kakao.svg"
          alt="Kakao 로그인"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </FloatButton>

      <FloatButton variant="solid" color="secondary" size="medium">
        <Image
          src="/icon/Apple.svg"
          alt="Apple 로그인"
          width={20}
          height={20}
          className="h-5 w-5"
        />
      </FloatButton>
    </div>
  );
};

export default SocialLoginButtons;
