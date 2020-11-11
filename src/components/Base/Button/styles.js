import styled from 'styled-components'

import {Button} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const ButtonCustom = styled(Button)`
  padding-left: ${indents["20"]};
  padding-right: ${indents["20"]};
  background-color: ${colors.main};
`;
