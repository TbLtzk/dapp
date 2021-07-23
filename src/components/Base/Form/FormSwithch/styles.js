import styled from 'styled-components';

import { Form } from 'react-bootstrap';

export const SwitcherWrapper = styled(Form.Group)`
  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.white;
      } else {
        return props.theme.colors.oxfordBlueTint1;
      }
    }};
    background-color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.white;
      } else {
        return props.theme.colors.oxfordBlueTint1;
      }
    }};
  }

  .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
    background-color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.oxfordBlueTint1;
      } else {
        return props.theme.colors.white;
      }
    }};
  }
`;
