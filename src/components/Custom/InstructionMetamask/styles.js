import styled from 'styled-components'

import {Container} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapContainer = styled.div`
  p, h4{
    color: ${colors.white};
  }
`;

export const WrapImgs = styled.div`
  padding-bottom: ${indents["10"]};
`;

export const Image = styled.img`
  height: 45px;
  padding-left: ${indents["10"]};
  padding-right: ${indents["10"]};

`;
