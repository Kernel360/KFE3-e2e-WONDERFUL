import * as Sentry from '@sentry/nextjs';

export const logger = {
  error: (message: string, error?: Error) => {
    console.error(message, error);
    Sentry.captureException(error || new Error(message));
  },

  info: (message: string) => {
    console.log(message);
    Sentry.captureMessage(message, 'info');
  },
};
