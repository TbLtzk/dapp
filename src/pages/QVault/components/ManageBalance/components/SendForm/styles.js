import styled from 'styled-components';

import Button from 'components/Base/Button';

export const SendButton = styled(Button)`
  width: 90px;
  margin-top: 27px;

  @media screen and (max-width: 1000px) {
    margin-top: 8px;
    margin-left: auto;
  }
`;
