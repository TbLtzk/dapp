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
  }
}
