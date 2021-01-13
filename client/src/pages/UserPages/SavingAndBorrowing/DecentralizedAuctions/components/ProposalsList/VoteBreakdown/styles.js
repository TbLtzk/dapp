import styled from 'styled-components'

import {Row} from "react-bootstrap";
import {indents, h5Text, UsualText, Circle} from "constants/style";

export const WrapResult = styled(Row)`
  margin-bottom: 26px;
`;
export const Title = styled.h5`
  ${props => props.theme.fontStyles.h5};
  margin-bottom: 11px;
  
`;

export const SubTitle = styled(h5Text)`
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Text = styled(UsualText)`
  color: ${props => props.highlight ? props.theme.colors.green : props.theme.colors.lightGrey};
`;

export const Descr = styled(UsualText)`
`;
export const WrapBlock = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const WrapColorDescr = styled.div`
  display: inline-block;
  margin-top: 21px;
`;


export const ColorTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 5px;
`;

export const CircleColor = styled(Circle)`
 
`;

export const CircleDescrData = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${props => props.theme.colors.lightGrey};
  margin-bottom: 4px;
`;

