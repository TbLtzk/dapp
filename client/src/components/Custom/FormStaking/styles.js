import styled from 'styled-components'

import {Col} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapContainer = styled.div`
  background-color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 34, 133, 0.25);
  border-radius: 8px;
  padding: ${indents["20"]};
`;

export const Headline = styled.p`
  color: ${colors.black};
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;

export const List = styled.ul`
  padding-left: 18px;
  li{
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: ${colors.lightGrey};
  }
`;
export const TextWrap = styled(Col)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
`;

export const TextWrapBlack = styled(TextWrap)`
  text-align: right;
  color: ${colors.black};
`;

export const TextWrapGrey = styled(TextWrap)`
  color: ${colors.lightGrey};
`;

export const TotalText = styled(TextWrap)`
  display: flex;
  align-items: center;
  color: ${colors.black};
  p{
    margin-bottom: 0;
  }
`;
export const WrapInput = styled(Col)`
  //display: flex;
  //align-items: center;
    
`;
