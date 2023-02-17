
import styled from 'styled-components';

export const StepperContainer = styled.div`
  display: grid;
  gap: 32px;
  align-content: start;
  padding: 24px 32px;

  .stepper__step {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: end;
    gap: 20px;

    &:not(:last-child) .stepper__step-check {
      &::after {
        content: '';
        position: absolute;
        top: calc(100% + 2px);
        left: 50%;
        background-color: ${({ theme }) => theme.colors.borderAdditional};
        transform: translateX(-50%);
        width: 2px;
        height: 48px;
        transition: all 150ms ease-out;
      }

      &.passed::after {
        background-color: ${({ theme }) => theme.colors.primaryMain};
      }
    }
  }

  .stepper__step-check {
    position: relative;
    display: flex;
    padding: 4px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 4px ${({ theme }) => theme.colors.borderAdditional};
    color: ${({ theme }) => theme.colors.backgroundSecondary};
    transition: all 150ms ease-out;

    &.current,
    &.passed {
      box-shadow: inset 0 0 0 4px ${({ theme }) => theme.colors.primaryMain};
    }

    &.passed {
      background-color: ${({ theme }) => theme.colors.primaryMain};

      .stepper__step-check-icon {
        opacity: 1;
      }
    }
  }

  .stepper__step-check-icon {
    opacity: 0;
    transition: opacity 150ms ease-out;
  }

  .stepper__step-index {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
