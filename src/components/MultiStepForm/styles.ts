import styled, { css } from 'styled-components';

export const MultiStepFormContainer = styled.div<{ $step: number }>`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  margin-top: 32px;

  .multi-step-form__step-content {
    margin-top: 24px;
  }

  .multi-step-form__step-tip {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const FormStepContainer = styled.form`
  .form-step-content {
    display: grid;
    gap: 16px;
  }

  .form-step-actions {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledFormBlock = styled.div<{ $disabled: boolean }>`
  position: relative;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme, $disabled }) => $disabled
    ? theme.colors.blockBorderDisabled
    : theme.colors.blockBorderAccent
  };

  .form-block__edit-btn {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .form-block__content {
    margin-top: 16px;
    display: grid;
    gap: 12px;
  }

  ${({ theme, $disabled }) => $disabled && css`
    .form-block__title {
      color: ${theme.colors.textDisabled};
    }
  `};
`;
