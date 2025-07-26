// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9c0dac06d753dcc69a188ba9e75ef840@o4509634509471744.ingest.us.sentry.io/4509634513928192',

  // 로그 활성화
  _experiments: {
    enableLogs: true,
  },

  // 콘솔 로그도 Sentry로 전송
  // integrations: [
  //   Sentry.consoleLoggingIntegration({
  //     levels: ["log", "error", "warn", "info"]
  //   })
  // ],

  tracesSampleRate: 1,
  debug: false,

  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
});
