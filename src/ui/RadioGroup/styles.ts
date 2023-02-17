
import styled, { css } from 'styled-components';
import { media } from 'styles/media';

export const RadioGroupContainer = styled.div<{
  $row: boolean;
  $disabled: boolean;
  $extended: boolean;
}>`
  .radio-group-lbl {
    margin-bottom: 8px;
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textSecondary
    };
  }

  .radio-group-options {
    display: flex;
    flex-direction: ${({ $row }) => $row ? 'row' : 'column'};
    gap: 12px;

    ${({ $extended }) => $extended && css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      ${media.lessThan('medium')} {
        grid-template-columns: 1fr;
      }
    `};
  }

  .radio-group-error {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.errorMain};
  }
`;
