
import styled from 'styled-components';

import { getRadioGroupColor } from './colors';

export const RadioGroupContainer = styled.div<{
  $row: boolean
  $disabled: boolean
}>`
  .radio-group-lbl {
    margin-bottom: 8px;
    color: ${({ theme, $disabled }) => $disabled
      ? getRadioGroupColor(theme, 'labelDisabled')
      : getRadioGroupColor(theme, 'label')
    };
  }

  .radio-group-options {
    display: flex;
    flex-direction: ${({ $row }) => $row ? 'row' : 'column'};
    gap: 12px;
  }

  .radio-group-error {
    margin-top: 4px;
    color: ${({ theme }) => getRadioGroupColor(theme, 'error')};
  }
`;
