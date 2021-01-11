import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const H5Headline = styled.h5`
 ${(props) => props.theme.fontStyles.h5};
`;

export const ContainerWrap = styled.div`
  //width: 50%;
`;

export const HeadlineWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const TotalWrap = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;

export const BottomText = styled.p`
  ${(props) => props.theme.fontStyles.text.middle};
  line-height: 22px;
`;

export const WrapBtn = styled(Col)`
  text-align: right;
`;

