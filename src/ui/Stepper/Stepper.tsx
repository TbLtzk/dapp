import { HTMLAttributes } from 'react';

import Icon from 'ui/Icon';

import { StepperContainer } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  current: number
  steps: { id: string, name: string }[]
}

function Stepper ({ current, steps, ...rest }: Props) {
  return (
    <StepperContainer {...rest}>
      {steps.map((step, index) => (
        <div key={step.id} className="stepper__step">
          <div
            className={`
              stepper__step-check
              ${index < current ? 'passed' : ''}
              ${index === current ? 'current' : ''}
          `}
          >
            <Icon
              className="stepper__step-check-icon"
              name="check"
            />
          </div>

          <div className="stepper__step-content">
            <p className="stepper__step-index text-md">
              {`Step ${index + 1}`}
            </p>
            <p className="stepper__step-name text-xl">
              {step.name}
            </p>
          </div>
        </div>
      ))}
    </StepperContainer>
  );
};

export default Stepper;
