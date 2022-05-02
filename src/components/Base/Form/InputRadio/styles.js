import styled from 'styled-components'

import { Form } from 'react-bootstrap'

export const RadioBtn = styled(Form.Check)`
  label {
    font-size: 15px;
    line-height: 20px;
    font-weight: 400;
    white-space: pre-wrap;
    color: ${props => props.active ? props.theme.colors.oxfordBlue : props.theme.colors.oxfordBlueTint3};
  }
`
