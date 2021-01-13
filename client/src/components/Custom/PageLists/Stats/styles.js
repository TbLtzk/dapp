import styled from 'styled-components';

import { Row, Col } from 'react-bootstrap';

import { h5Text } from 'constants/style';

export const WrapTitleBlock = styled(Row)`
  padding-bottom: 20px;
`;
export const BlockWrap = styled.div`
  margin-top: 130px;
`;
export const WrapTitle = styled(Col)`
  //padding: 0;
`;
export const Title = styled(h5Text)`
  margin-bottom: 0;
`;
export const WrapBtnView = styled(Col)`
  text-align: right;
  //padding: 0;
`;
export const WrapDescrTitle = styled(Col)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${props => props.theme.colors.lightGrey}
`;
export const WrapDescr = styled(Col)`
  text-align: right;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${props => props.theme.colors.black}
`;
export const WrapBtn = styled(Col)`
  padding-top: 30px;
`;
