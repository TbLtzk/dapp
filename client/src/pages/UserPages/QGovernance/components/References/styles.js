import styled from 'styled-components'

import {Row, Col} from "react-bootstrap";

import {indents, h5Text} from "constants/style";


export const WrapTitleBlock = styled(Row)`
  padding-bottom: 20px;
`;
export const BlockWrap = styled.div`
  margin-top: 40px;
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
export const WrapDescrLink = styled(Col)`
  padding: 0;
`;
