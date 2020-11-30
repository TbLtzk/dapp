import styled from 'styled-components'

import {Row, Col} from "react-bootstrap";

import {colors, indents, h5Text} from "constants/style";


export const BlockWrap = styled(Row)`
  margin-top: 130px;
`;
export const Title = styled(h5Text)`
`;
export const WrapBtnView = styled(Col)`
  text-align: right;
`;
export const WrapDescrTitle = styled(Col)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${colors.lightGrey}
`;
export const WrapDescr = styled(Col)`
  text-align: right;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${colors.black}
`;
