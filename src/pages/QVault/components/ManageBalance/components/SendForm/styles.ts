import styled from 'styled-components';
import { media } from 'styles/media';
import Button from 'ui/Button';

export const SendButton = styled(Button)`
  width: 90px;
  margin-top: 33px;

  ${media.lessThan('medium')} {
    margin-top: 8px;
    margin-left: auto;
  }
`;
