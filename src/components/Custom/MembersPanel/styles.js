import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const H5Headline = styled.h5`
 ${(props) => props.theme.fontStyles.h5};
`;

export const ContainerWrap = styled.div`
  //width: 50%;
`;

export const LoadingWrap = styled(Col)`
  text-align: center;
`;

export const HeadlineWrap = styled.div`
  //display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const TotalWrap = styled.div`
  ${(props) => props.theme.fontStyles.text.middle};
  line-height: 18px;
  color: ${props => props.theme.colors.white};
`;

export const BottomText = styled.p`
  ${(props) => props.theme.fontStyles.text.middle};
  line-height: 22px;
`;

export const WrapBtn = styled(Col)`
  text-align: right;
`;

