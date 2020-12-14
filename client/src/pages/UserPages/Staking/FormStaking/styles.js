import styled from 'styled-components'

import {Col} from "react-bootstrap";

import {indents} from "constants/style";

export const Headline = styled.p`
  color: ${props => props.theme.colors.black};
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
      color: ${props => props.theme.colors.lightGrey};
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
  color: ${props => props.theme.colors.black};
`;

export const TextWrapGrey = styled(TextWrap)`
  color: ${props => props.theme.colors.lightGrey};
`;

export const TotalText = styled(TextWrap)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.black};
  p{
    margin-bottom: 0;
  }
`;
export const WrapInput = styled(Col)`
  //display: flex;
  //align-items: center;
    
`;
