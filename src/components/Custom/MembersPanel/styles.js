import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const H5Headline = styled.h5`
 ${(props) => props.theme.fontStyles.h5};
`;

export const ContainerWrap = styled.div`
  //width: 50%;
`;

export const LoadingWrap = styled(Col)`
  text-align: start;
  margin: 10px 0;
`;

export const HeadlineWrap = styled.div`
  justify-content: space-between;
  align-items: baseline;
`;

export const WrapBtn = styled(Col)`
  text-align: right;
`;

