import styled from 'styled-components'

import {Button, Modal} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const Header = styled(Modal.Header)`
  border-bottom: 0;
`;

export const Body = styled(Modal.Body)`
  padding-left: ${indents["40"]};
  padding-right: ${indents["40"]};
`;

export const Footer = styled(Modal.Footer)`
  border-top: 0;
`;
