import styled from 'styled-components'

import {Alert} from "react-bootstrap";

import {indents} from "constants/style";


export const AlertStyle = styled(Alert)`
  //padding-left: ${indents["40"]};
  margin-top: ${indents["20"]};
  //background-color:${props => props.theme.colors.error};
  //border-color: ${props => props.theme.colors.error};
  p{
    color: ${props => props.theme.colors.white}
  }
`;
