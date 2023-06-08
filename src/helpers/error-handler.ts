import * as Sentry from '@sentry/react';
import { getErrorMessage } from 'helpers';

import { Bus } from 'utils/event-bus';

export class ErrorHandler {
  static process (error: Error | unknown, errorMessage = ''): void {
    const msgTranslation = errorMessage || getErrorMessage(error);
    Bus.error(msgTranslation);

    ErrorHandler.processWithoutFeedback(error);
  }

  static processWithoutFeedback (error: Error | unknown): void {
    console.error(error);

    if (import.meta.env.NODE_ENV !== 'development') {
      Sentry.captureMessage((error as Error).message);
    }
  }
}
