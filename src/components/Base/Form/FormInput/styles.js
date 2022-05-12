import { Form } from 'react-bootstrap';

import styled, { css } from 'styled-components';

const inputMinHeight = '10px';

export const InputWrapper = styled(Form.Group)`
  position: relative;
  margin-bottom: 0;
  width: 100%;

  div {
    display: flex;
  }

  input {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 11px;
    box-sizing: border-box;
    text-align: left;
    min-height: ${inputMinHeight};
    border-radius: ${(p) => p.$prefix ? '0 3px 3px 0' : '3px'};
    background: ${getBackgroundColor};
    border: 1px solid ${getInputColor};
    color: ${getInputColor};

    &:focus,
    .form-control:focus {
      box-shadow: none !important;
      outline: none;
      background: ${getBackgroundColor};
      border-color: ${getMainColor};
      color: ${(p) => {
        return p.theme.palette === 'dark' && p.$invertedColors
          ? p.theme.colors.oxfordBlueTint1
          : p.theme.colors.white;
      }};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${(p) => p.theme.palette === 'dark' ? 'transparent' : p.theme.colors.blue};
      border: 1px solid ${(p) => p.theme.colors.oxfordBlueTint2};
      color: ${(p) => {
        return p.theme.palette === 'dark'
          ? p.theme.colors.oxfordBlueTint5
          : p.theme.colors.oxfordBlueTint2;
      }};
    }
  }

  .input__max {
    position: absolute;
    right: 8px;
    top: 4px;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    ${getMaxButtonStyle}
  }

  .input__prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    min-height: ${inputMinHeight};
    border-radius: 3px 0 0 3px;
    padding: 6px 10px;
    white-space: nowrap;
    background-color: ${(p) => {
      return p.$disabled
        ? p.theme.colors.oxfordBlueTint2
        : getInputColor(p);
    }};
    color: ${(p) => {
      return p.theme.palette === 'dark' && !p.$disabled
        ? p.theme.colors.white
        : p.theme.colors.oxfordBlueTint1;
    }};
  }

  ${(p) => !p.$error && css`
    div:focus-within .input__prefix {
      color: ${p.theme.colors.oxfordBlueTint1};
      background-color: ${
        p.theme.palette === 'dark'
          ? p.theme.colors.neonGreen
          : p.theme.colors.white
      };
    }
  `}
`;

function getBackgroundColor (p) {
  return p.theme.palette === 'dark'
    ? 'transparent'
    : p.theme.colors.blue;
}

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

function getMaxButtonStyle (p) {
  if (p.$disabled) {
    return css`
      cursor: default;
      color: ${p.theme.colors.oxfordBlueTint2};
    `;
  }

  if (p.theme.palette === 'dark') {
    return css`
      color: ${p.theme.colors.oxfordBlueTint4};
      &:hover {
        color: ${p.$invertedColors ? p.theme.colors.oxfordBlueTint1 : p.theme.colors.neonGreen};
      }
    `;
  }

  return css`
    color: ${p.theme.colors.oxfordBlueTint2};
    &:hover {
      color: ${p.theme.colors.oxfordBlueTint6};
    }
  `;
}
