
import { ReactNode } from 'react';

import Button from '../Button';
import { Body, Footer } from '../ModalWindow/styles';

interface Props<T> {
  disabled?: boolean
  children: ReactNode
  onNext?: (values: T) => void
  onBack?: () => void
  onConfirm?: (values: T) => void
}

function ModalStep<T> ({
  disabled = false,
  children,
  onNext,
  onBack,
  onConfirm
}: Props<T>) {
  const nextHandler = onNext || onConfirm;

  return (
    <div>
      <Body>{children}</Body>

      <Footer>
        {onBack && (
          <Button
            look="white"
            onClick={onBack}
          >
            <i className="mdi mdi-arrow-left" />
            <span>Back</span>
          </Button>
        )}

        {nextHandler && (
          <Button
            disabled={disabled}
            onClick={nextHandler}
          >
            <span>{onConfirm ? 'Confirm' : 'Next'}</span>
            <i className="mdi mdi-arrow-right" />
          </Button>
        )}
      </Footer>
    </div>
  );
}

export default ModalStep;
