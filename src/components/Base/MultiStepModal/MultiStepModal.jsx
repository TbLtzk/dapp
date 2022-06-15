import { ProgressBar } from 'react-bootstrap';

import { Header, ModalContainer } from '../ModalWindow/styles';

import { StepsWrapper } from './styles';

function MultiStepModal ({
  stepIndex,
  modalOpen,
  title,
  scrollable = true,
  children,
  onHide
}) {
  const steps = children.filter(val => val);

  return (
    <ModalContainer
      centered
      show={modalOpen}
      scrollable={scrollable}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
    >
      <Header closeButton={onHide}>
        <div className="multi-step-header">
          <div className="modal-title">{title}</div>

          <ProgressBar now={(((stepIndex + 1) / steps.length) * 100).toFixed(3)} />

          <div className="modal__steps">
            Step {stepIndex + 1} of {steps.length}
          </div>
        </div>
      </Header>

      <StepsWrapper $step={stepIndex + 1}>
        {children}
      </StepsWrapper>
    </ModalContainer>
  );
}

export default MultiStepModal;
