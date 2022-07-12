import styled from 'styled-components';
import Button from 'ui/Button';

export const SendButton = styled(Button)`
  width: 90px;
  margin-top: 33px;

  @media screen and (max-width: 1000px) {
    margin-top: 8px;
    margin-left: auto;
  }
`;
