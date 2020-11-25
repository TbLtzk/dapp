import styled from 'styled-components'

import {colors, indents, h5Text} from "constants/style";

export const H5Headline = styled(h5Text)`
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
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${colors.lightGrey};
`;
