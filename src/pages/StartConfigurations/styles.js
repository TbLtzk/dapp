import styled from 'styled-components'

import {Container, Row} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapContainer = styled(Container)`
  background: ${colors.main};
  padding: ${indents["30"]};
  height: ${props => props.seeView ? "100vh" : "100%"};
`;

export const WrapRow = styled(Row)`
  height: ${props => props.seeView ? "100vh" : "100%"};
`;

export const WrapBlock = styled.div`
   height: ${props => props.seeView ? "100vh" : "100%"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;


