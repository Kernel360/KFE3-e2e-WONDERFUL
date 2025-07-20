import localFont from 'next/font/local';

import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';

import Navigation from '@/components/layout/navigation';

import LocationModalProvider from '@/providers/location-modal-provider';
import QueryProvider from '@/providers/query-provider';

import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  style: 'normal',
  variable: '--font-pretendard',
});

const APP_NAME = '지역 경매 서비스';
const APP_DEFAULT_TITLE = '지역 경매 서비스';
const APP_TITLE_TEMPLATE = '%s - 경매앱';
const APP_DESCRIPTION = '지역 기반 실시간 경매 플랫폼';

// 클라이언트 컴포넌트와 서버 컴포넌트 분리
export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#fff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.className} suppressHydrationWarning>
        <QueryProvider>
          <div
            className="relative mx-auto flex h-screen min-w-[320px] max-w-[480px] flex-col"
            style={{ position: 'relative' }}
          >
            {children}

            <Toaster
              position="top-center"
              richColors
              offset={20} // 상단에서 20px 떨어진 위치에 표시
              toastOptions={{
                style: {
                  background: '#fff',
                  color: '#181818',
                  border: '1px solid #555',
                  fontSize: '16px',
                },
              }}
              expand={true}
              duration={3000}
            />

            <LocationModalProvider />
            <Navigation />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
