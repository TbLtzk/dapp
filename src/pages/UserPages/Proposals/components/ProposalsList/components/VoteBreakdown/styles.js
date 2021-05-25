import styled from 'styled-components';

import { h5Text, UsualText } from 'constants/style';

export const ColorTitle = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: ${props => props.color ? props.color : props.theme.colors.white};
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

