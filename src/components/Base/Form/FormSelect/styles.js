import styled from 'styled-components'
import { Form } from 'react-bootstrap'

const selectMinHeight = '10px'

export const SelectWrapper = styled(Form.Group)`
  margin-bottom: 0;
  width: ${(props) => (!props.width ? '100%' : props.width)};

  select {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 11px;
    margin-bottom: 15px;
    background: transparent;
    border: 1px solid ${(props) => {
      if (props.palette === 'dark') {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2
      } else {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4
      }
    }};
    box-sizing: border-box;

    border-radius: ${(props) => {
      if (props.lbl) {
        return '0 3px 3px 0'
      } else {
        return '3px'
      }
    }};
    min-height: ${selectMinHeight};
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2
      } else {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4
      }
    }};

    &:focus {
      outline: none;
      background: transparent;
      border: 1px solid ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1
        } else {
          return props.theme.colors.white
        }
      }};
      color: ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1
        } else {
          return props.theme.colors.white
        }
      }};
    }

    &:disabled {
      background: transparent;
      border: 1px solid ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5
        } else {
          return props.theme.colors.oxfordBlueTint2
        }
      }};
      color: ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5
        } else {
          return props.theme.colors.oxfordBlueTint2
        }
      }};
    }

    &:after {
      right: 20px
    }
  }
`
