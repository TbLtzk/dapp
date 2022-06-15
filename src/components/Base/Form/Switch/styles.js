import { Form } from 'react-bootstrap';

import styled from 'styled-components';

export const StyledSwitch = styled(Form.Switch)`
  font-size: 15px;

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: ${({ theme }) => theme.colors.oxfordBlueTint1};
    background-color: ${({ theme }) => theme.colors.oxfordBlueTint1};
  }

  .custom-control-input:checked ~ .custom-control-label::after {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
