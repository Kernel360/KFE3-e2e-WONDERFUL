import { Inter } from 'next/font/google';

import type { Metadata, Viewport } from 'next';

import QueryProvider from '../src/lib/providers/query-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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
  themeColor: '#5758FE',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
