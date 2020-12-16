import styled from 'styled-components'

import {Button} from "react-bootstrap";

import {indents} from "constants/style";

export const ButtonCustom = styled(Button)`
  width: ${props => 'undefined' === props.width ? 'auto' : props.width};
  ${props => props.theme.fontStyles.text.middle};
  padding-left: ${indents["20"]};
  padding-right: ${indents["20"]};
  border-color: ${props => {
    switch (props.type) {
        case 'white':
            return props => props.theme.colors.white;
        case 'outline':
            return props => props.theme.colors.main;
        default:
            return props => props.theme.colors.main;
    }
  }};
  background-color: ${props => {
    switch (props.type) {
        case 'white':
            return props => props.theme.colors.white;
        case 'outline':
            return props => props.theme.colors.white;
        default:
            return props => props.theme.colors.main;
    }
  }};
  color: ${props => {
    switch (props.type) {
        case 'white':
            return props => props.theme.colors.main;
        case 'outline':
            return props => props.theme.colors.main;
        default:
            return props => props.theme.colors.white;
    }
  }};
  box-shadow: 0 4px 4px rgba(81, 126, 255, 0.25);
  border-radius: 8px;
  &:disabled {
    color: ${props => {
        switch (props.type) {
            case 'white':
                return props => props.theme.colors.main;
            case 'outline':
                return props => props.theme.colors.main;
            case 'usual':
                return props => props.theme.colors.white;
            default:
                return props => props.theme.colors.white;
        }
    }};
    background-color: ${props => {
        switch (props.type) {
            case 'white':
                return props => props.theme.colors.white;
            case 'outline':
                return props => props.theme.colors.white;
            case 'usual':
                return props => props.theme.colors.whiteGrey;
            default:
                return props => props.theme.colors.main;
        }
    }};

    border-color: ${props => {
        switch (props.type) {
            case 'white':
                return props => props.theme.colors.white;
            case 'outline':
                return props => props.theme.colors.main;
            case 'usual':
                return props => props.theme.colors.whiteGrey;
            default:
                return props => props.theme.colors.main;
        }
  }};
    opacity: 1;
    box-shadow: none;
  }
  border-radius: 8px;
  min-height: 42px;
`;
// usual
