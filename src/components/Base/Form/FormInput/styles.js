import styled from 'styled-components';

import { Form } from 'react-bootstrap';

const inputMinHeight = '10px';

export const InputWrapper = styled(Form.Group)`
  margin-bottom: 0;
  width: 100%;

  input {
    ${(props) => {
      props.myprop = 'nefocuse';
    }}
    font-size: 14px;
    line-height: 20px;
    padding: 6px 11px;
    background: transparent;
    border: 1px solid ${(props) => {
      if (props.palette === 'dark') {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
      } else {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
      }
    }};
    box-sizing: border-box;

    border-radius: ${(props) => {
      if (props.lbl) {
        return '0 3px 3px 0';
      } else {
        return '3px';
      }

    }};
    min-height: ${inputMinHeight};
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
      } else {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
      }
    }};

    &:focus {
      outline: none;
      background: transparent;
      border: 1px solid ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1;
        } else {
          return props.theme.colors.white;
        }
      }};
      color: ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1;
        } else {
          return props.theme.colors.white;
        }
      }};
    }

    &:disabled {
      background: transparent;
      border: 1px solid ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5;
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      }};
      color: ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5;
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      }};
    }
  }

  .input_lbl {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    min-height: ${inputMinHeight};
    border-radius: 3px 0 0 3px;
    padding: 6px 10px;
    color: ${(props) => {
      if (props.palette === 'dark') return props.theme.colors.white;
      return props.theme.colors.oxfordBlueTint1;
    }};
    background: ${(props) => {
      if (props.isfocus) {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1;
        } else {
          return props.theme.colors.white;
        }
      } else if (props.isdisabled) {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5;
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      } else {
        if (props.palette === 'dark') {
          return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
        } else {
          return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
        }
      }
    }};
  }
`;
