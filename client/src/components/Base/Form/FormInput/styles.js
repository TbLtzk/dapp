import styled from 'styled-components';

import { Form } from 'react-bootstrap';

export const InputWrapper = styled(Form.Group)`
  margin-bottom: 0;
  input{
      background: ${(props) => props.theme.colors.darkWhite};
      border: 1px solid ${(props) => props.theme.colors.whiteGrey};
      box-sizing: border-box;
      border-radius: ${(props) => props.theme.borderRadius[1]};
      min-height: 42px;
      text-align: ${(props) => (props.align ? props.align : 'left')};
      ${(props) => props.theme.fontStyles.text.middle};
  }
`;
