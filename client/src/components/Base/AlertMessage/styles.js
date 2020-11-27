import styled from 'styled-components'

import {Alert} from "react-bootstrap";

import {colors, indents} from "constants/style";


export const AlertStyle = styled(Alert)`
  //padding-left: ${indents["40"]};
  margin-top: ${indents["20"]};
  //background-color: ${colors.error};
  //border-color: ${colors.error};;
  p{
    color: ${colors.black}
  }
`;
