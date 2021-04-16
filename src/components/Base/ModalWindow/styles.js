import styled from 'styled-components'

import {Button, Modal} from "react-bootstrap";

import {indents} from "constants/style";

export const Header = styled(Modal.Header)`
  background: ${props => props.theme.colors.oxfordBlueTint6};
  border-bottom: 0;
`;

export const Body = styled(Modal.Body)`
  padding-left: ${indents["40"]};
  padding-right: ${indents["40"]};
  padding-top: 0;
  min-height: 326px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  background: ${props => props.theme.colors.oxfordBlueTint6};
  hyphens: auto;
`;

export const Footer = styled(Modal.Footer)`
  border-top: 0;
  background: ${props => props.theme.colors.oxfordBlueTint6};
`;

export const ModalW = styled(Modal)`
  .modal-dialog{
    //min-height: 948px;
    //position: absolute;
    //right: 0;
    //margin-top: 0;
  }
`;
