import styled, { css } from 'styled-components';

export const CalendarWrapper = styled.div`
  input {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 11px;
    box-sizing: border-box;
    text-align: left;
    min-height: 10px;
    border-radius: 3px;
    background-color: ${(p) => p.theme.palette === 'dark' ? 'transparent' : p.theme.colors.blue};
    border: 1px solid ${getInputColor};
    color: ${getInputColor};

    &:focus {
      box-shadow: none !important;
      outline: none;
      border-color: ${getMainColor};
      color: ${(p) => {
        return p.theme.palette === 'dark' && p.$invertedColors
          ? p.theme.colors.oxfordBlueTint1
          : p.theme.colors.white;
      }};
    }

    &:disabled {
      cursor: not-allowed;

      ${(p) => !p.$error && css`
        background: ${p.theme.palette === 'dark' ? 'transparent' : p.theme.colors.blue};
        border: 1px solid ${p.theme.colors.oxfordBlueTint2};
        color: ${p.theme.palette === 'dark'
          ? p.theme.colors.oxfordBlueTint5
          : p.theme.colors.oxfordBlueTint2
        };
      `
      }
    }
  }
`;

function getMainColor (p) {
  return p.theme.palette === 'dark'
    ? p.theme.colors.oxfordBlueTint2
    : p.theme.colors.oxfordBlueTint4;
}

function getInputColor (p) {
  return p.$error
    ? p.theme.colors.validationError
    : getMainColor(p);
}
