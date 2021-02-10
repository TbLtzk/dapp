import styled from 'styled-components';

import { Col } from 'react-bootstrap';

export const BlockWrap = styled.div`
  margin-top: 20px;
`;
export const WrapTitle = styled(Col)`
  //padding: 0;
`;
export const Title = styled.h5`
  ${(props) => props.theme.fontStyles.title.subtitle};
  margin-bottom: 10px;
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
