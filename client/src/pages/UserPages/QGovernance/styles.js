import styled from 'styled-components';

import { Row } from 'react-bootstrap';

import { indents } from 'constants/style';

export const WrapTabs = styled(Row)`
  padding-top: ${indents[40]};
`;
export const WrapBtn = styled(Row)`
  padding-top: ${indents[40]};
`;

export const Title = styled.p`
 ${props => props.theme.fontStyles.title.big};
 text-transform: capitalize;
`;
