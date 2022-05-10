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
    background: ${getBackgroundColor};
    border: 1px solid ${getInputColor};
    box-sizing: border-box;

    border-radius: ${(props) => props.prefix ? '0 3px 3px 0' : '3px'};
    min-height: ${inputMinHeight};
    text-align: 'left';
    color: ${getInputColor};

    &:focus,
    .form-control:focus {
      box-shadow: none !important;
      outline: none;
      background: ${getBackgroundColor};
      border-color: ${getMainColor};
      color: ${(props) => {
        return props.palette === 'dark' && !props.color
          ? props.theme.colors.oxfordBlueTint1
          : props.theme.colors.white;
      }};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${(props) => props.palette === 'dark' ? 'transparent' : props.theme.colors.blue};
      border: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
      color: ${(props) => {
        return props.palette === 'dark'
          ? props.theme.colors.oxfordBlueTint5
          : props.theme.colors.oxfordBlueTint2;
      }};
    }
  }

  .input__max {
    right: 8px;
    top: 4px;
    position: absolute;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
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
    color: ${(props) => {
      return props.palette === 'dark' && !(props.isdisabled || props.isfocus)
        ? props.theme.colors.white
        : props.theme.colors.oxfordBlueTint1;
    }};
    background: ${getPrefixBackground};
  }
`;

function getBackgroundColor (props) {
  if (props.palette === 'dark') {
    return props.color
      ? props.theme.colors.oxfordBlueTint1
      : 'transparent';
  }

  return props.theme.colors.blue;
}

function getMainColor (props) {
  return props.palette === 'dark'
    ? props.theme.colors.oxfordBlueTint2
    : props.theme.colors.oxfordBlueTint4;
}

function getInputColor (props) {
  return props.type === 'error'
    ? props.theme.colors.validationError
    : getMainColor(props);
}

function getPrefixBackground (props) {
  if (props.isfocus) {
    return props.palette === 'dark'
      ? props.theme.colors.neonGreen
      : props.theme.colors.white;
  }

  return props.isdisabled
    ? props.theme.colors.oxfordBlueTint2
    : getInputColor(props);
}

function getMaxButtonStyle (props) {
  if (props.isdisabled) {
    return css`
      cursor: default;
      color: ${props.theme.colors.oxfordBlueTint2};
    `;
  }

  if (props.palette === 'dark') {
    return css`
      color: ${props.theme.colors.oxfordBlueTint4};
      &:hover {
        color: ${props.modal ? props.theme.colors.oxfordBlueTint1 : props.theme.colors.neonGreen};
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
