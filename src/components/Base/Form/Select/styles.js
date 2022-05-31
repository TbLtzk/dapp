import { Form } from 'react-bootstrap';

import styled, { css } from 'styled-components';

export const SelectWrapper = styled(Form.Group)`
  margin-bottom: 0;
  
  .select-container {
    position: relative;
    color: ${(p) => {
      if (p.$error) return p.theme.colors.validationError;

      return p.theme.palette === 'dark'
        ? p.theme.colors.oxfordBlueTint2
        : p.theme.colors.oxfordBlueTint4;
    }};
  }

  .select-icon {
    position: absolute;
    top: 50%;
    right: 3px;
    line-height: 1;
    transform: translateY(-50%);
    font-size: 20px;
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
    border: 1px solid ${(p) => {
      if (p.$error) return p.theme.colors.validationError;

      return p.theme.palette === 'dark'
        ? p.theme.colors.oxfordBlueTint2
        : p.theme.colors.oxfordBlueTint4;
    }};

    &:focus {
      outline: none;
      background: transparent;
      ${(p) => {
        if (p.$error) return;
        return css`
          border: 1px solid ${(p) => p.theme.palette === 'dark'
            ? p.theme.colors.oxfordBlueTint1
            : p.theme.colors.white
          };
          color: ${(p) => p.theme.palette === 'dark'
            ? p.theme.colors.oxfordBlueTint1
            : p.theme.colors.white
          };
        `;
      }}
    }

    &:disabled {
      background: transparent;
      border: 1px solid ${(p) => p.theme.palette === 'dark'
        ? p.theme.colors.oxfordBlueTint5
        : p.theme.colors.oxfordBlueTint2
      };
      color: ${(p) => p.theme.palette === 'dark'
        ? p.theme.colors.oxfordBlueTint5
        : p.theme.colors.oxfordBlueTint2
      };
    }
  }

  option {
    color: #0B2545;
  }
`;
