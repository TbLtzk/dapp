
import Button from '../Button';
import { Body, Footer } from '../ModalWindow/styles';

function ModalStep ({
  disabled,
  children,
  onNext,
  onBack,
  onConfirm
}) {
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
