import styled from 'styled-components'

import {Button} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const ButtonCustom = styled(Button)`
  width: ${props => 'undefined' === props.width ? 'auto' : props.width};
  padding-left: ${indents["20"]};
  padding-right: ${indents["20"]};
  border-color: ${props => {
    switch (props.type) {
        case 'white':
            return colors.white;
        case 'outline':
            return colors.main;
        default:
            return colors.main;
    }
}};
  background-color: ${props => {
    switch (props.type) {
        case 'white':
            return colors.white;
        case 'outline':
            return colors.white;
        default:
            return colors.main;
    }
}};
  color: ${props => {
    switch (props.type) {
        case 'white':
            return colors.main;
        case 'outline':
            return colors.main;
        default:
            return colors.white;
    }
}};
  box-shadow: 0 4px 4px rgba(81, 126, 255, 0.25);
  border-radius: 8px;
  &:disabled {
    color: ${props => props.type === "white" ? colors.main : colors.white};
    background-color: ${props => props.type === "white" ? colors.white : colors.main};
    border-color: ${props => props.type === "white" ? colors.white : colors.main};
    opacity: 1
  }
  border-radius: 8px;
  height: 42px;
`;
