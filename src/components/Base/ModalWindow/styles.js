import styled from 'styled-components';

import { Modal } from 'react-bootstrap';

import { indents } from 'constants/style';

export const Header = styled(Modal.Header)`
  background: ${props => props.theme.colors.oxfordBlueTint6};
  border-bottom: 0;
`;

export const Body = styled(Modal.Body)`
  padding-left: ${indents['40']};
  padding-right: ${indents['40']};
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
  .modal-header {
    padding: ${indents['20']};
  }

  .modal-title {
    color: ${props => props.theme.colors.oxfordBlue};
    font-size: 20px;
    line-height: 35px;
    font-family: 'Lora', sans-serif;
  }

  .modal-body {
    padding: 0 ${indents['20']};
  }

  .modal-line {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.oxfordBlueTint3};
  }

  h3 {
    color: ${props => props.theme.colors.oxfordBlueTint3};
    font-size: 16px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 15px;
  }

  h4 {
    color: ${props => props.theme.colors.oxfordBlue};
    font-size: 13px;
    line-height: 18px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 10px;
  }

  h5 {
    color: ${props => props.theme.colors.oxfordBlueTint3};
    font-size: 13px;
    line-height: 17px;
    font-weight: 600;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 2px;
  }

  p {
    color: ${props => props.theme.colors.oxfordBlue};
    font-size: 13px;
    margin-bottom: 15px;
  }

  .modal-one-line-form {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;

    & > *:not(:first-child) {
      margin-left: 14px;
    }
  }
`;
