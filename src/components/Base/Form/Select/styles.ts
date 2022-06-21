import { Form } from 'react-bootstrap';

import styled, { css } from 'styled-components';

export const SelectWrapper = styled(Form.Group)`
  margin-bottom: 0;
  
  .select-container {
    position: relative;
    color: ${(p) => {
      if (p.$error) return p.theme.colors.validationError;

      return p.$disabled
        ? p.theme.colors.oxfordBlueTint2
        : p.theme.colors.oxfordBlueTint4;
    }};

    &:focus-within {
      ${(p) => !p.$error && css`  
        color: ${p.$invertedColors ? p.theme.colors.oxfordBlue : p.theme.colors.white}; 
      `}
    }
  }

  .select-icon {
    position: absolute;
    top: 50%;
    right: 3px;
    line-height: 1;
    transform: translateY(-50%);
    font-size: 20px;
    color: inherit;
    pointer-events: none;
  }

  select {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 24px 6px 11px;
    background: transparent;
    box-sizing: border-box;
    min-height: 10px;
    width: 100%;
    appearance: none;
    color: inherit;
    border-radius: ${(p) => p.label ? '0 3px 3px 0' : '3px'};
    border: 1px solid ${(p) => p.$error
      ? p.theme.colors.validationError
      : p.theme.colors.oxfordBlueTint4
    };

    &:focus {
      outline: none;
      background: transparent;
      ${(p) => !p.$error && css`
        border: 1px solid ${p.$invertedColors ? p.theme.colors.oxfordBlue : p.theme.colors.white};
      `}
    }

    &:disabled {
      background: transparent;
      border: 1px solid ${(p) => p.theme.colors.oxfordBlueTint2};
    }
  }

  option {
    color: #0B2545;
  }
`;
