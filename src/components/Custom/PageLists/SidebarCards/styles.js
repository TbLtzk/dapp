import styled from 'styled-components';

import { Row, Col } from 'react-bootstrap';

export const WrapTitleBlock = styled(Row)`
  padding-bottom: 20px;
`;

export const WrapTitle = styled(Col)`
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
  color: ${props => props.theme.colors.white}
`;
export const WrapDescr = styled(Col)`
  text-align: right;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${props => props.theme.colors.white}
`;
export const WrapBtn = styled(Col)`
  padding-top: 30px;
`;

export const Title = styled.h5`
  ${(props) => props.theme.fontStyles.h5};
  margin-bottom: 0;
`;
