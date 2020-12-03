import styled from 'styled-components'

import {Container, Row} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapContainer = styled(Container)`
  background: ${colors.main};
  height: 100vh;
`;

export const WrapRow = styled(Row)`
`;

export const WrapBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WrapLogo = styled.div`
    padding-bottom: ${indents["20"]};
`;
