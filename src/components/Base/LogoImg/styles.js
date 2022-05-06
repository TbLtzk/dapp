import { Button } from 'react-bootstrap';

import styled from 'styled-components';

import { indents } from 'constants/style';

export const Link = styled(Button)`
  padding-left: ${indents['20']};
  padding-right: ${indents['20']};
  color: ${props => props.theme.colors.main};
  font-weight: 600;
  font-size: 14px;
`;
