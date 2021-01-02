import styled from 'styled-components';

import { Button } from 'react-bootstrap';

export const Link = styled(Button)`
  ${(props) => props.theme.fontStyles.text.middle};
  width: ${(props) => (props.width === 'undefined' ? 'auto' : props.width)};
  color: ${(props) => props.theme.colors.main};
  font-weight: 600;
  font-size: 14px;
`;
