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
    text-align: 'left';
    min-height: ${inputMinHeight};
    border-radius: ${(props) => props.$prefix ? '0 3px 3px 0' : '3px'};
    background: ${getBackgroundColor};
    border: 1px solid ${getInputColor};
    color: ${getInputColor};

    &:focus,
    .form-control:focus {
      box-shadow: none !important;
      outline: none;
      background: ${getBackgroundColor};
      border-color: ${getMainColor};
      color: ${(props) => {
        return props.theme.palette === 'dark' && !props.$color
          ? props.theme.colors.oxfordBlueTint1
          : props.theme.colors.white;
      }};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${(props) => props.theme.palette === 'dark' ? 'transparent' : props.theme.colors.blue};
      border: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
      color: ${(props) => {
        return props.theme.palette === 'dark'
          ? props.theme.colors.oxfordBlueTint5
          : props.theme.colors.oxfordBlueTint2;
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
    background-color: ${(props) => {
      return props.$disabled
        ? props.theme.colors.oxfordBlueTint2
        : getInputColor(props);
    }};
    color: ${(props) => {
      return props.theme.palette === 'dark' && !props.$disabled
        ? props.theme.colors.white
        : props.theme.colors.oxfordBlueTint1;
    }};
  }

  div:focus-within .input__prefix {
    color: ${(props) => props.theme.colors.oxfordBlueTint1};
    background-color: ${(props) => {
      return props.theme.palette === 'dark'
        ? props.theme.colors.neonGreen
        : props.theme.colors.white;
    }};
  }
`;

function getBackgroundColor (props) {
  if (props.theme.palette === 'dark') {
    return props.$color
      ? props.theme.colors.oxfordBlueTint1
      : 'transparent';
  }

  return props.theme.colors.blue;
}

function getMainColor (props) {
  return props.theme.palette === 'dark'
    ? props.theme.colors.oxfordBlueTint2
    : props.theme.colors.oxfordBlueTint4;
}

function getInputColor (props) {
  return props.$error
    ? props.theme.colors.validationError
    : getMainColor(props);
}

function getMaxButtonStyle (props) {
  if (props.$disabled) {
    return css`
      cursor: default;
      color: ${props.theme.colors.oxfordBlueTint2};
    `;
  }

  if (props.theme.palette === 'dark') {
    return css`
      color: ${props.theme.colors.oxfordBlueTint4};
      &:hover {
        color: ${props.$modal ? props.theme.colors.oxfordBlueTint1 : props.theme.colors.neonGreen};
      }
    `;
  }

  return css`
    color: ${props.theme.colors.oxfordBlueTint2};
    &:hover {
      color: ${props.theme.colors.oxfordBlueTint6};
    }
  `;
}
