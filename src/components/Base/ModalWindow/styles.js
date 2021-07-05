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


  .modal-footer {
    justify-content: ${props => props.backbtntitle ? 'space-between' : null};
  }

  h2 {
    font-size: 15px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 15px;
    color: ${props => props.theme.colors.oxfordBlue};
    font-family: 'OpenSans', sans-serif;
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

  .progress {
    height: 1px;
    background-color: ${props => props.theme.colors.oxfordBlueTint5};
  }

  .progress-bar {
    background-color: ${props => props.theme.colors.oxfordBlue};
  }

  .modal__steps {
    font-size: 13px;
    line-height: 13px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 30px;
    color: ${props => props.theme.colors.oxfordBlue};
  }

  .modal__line {
    width: 100%;
    height: 1px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.oxfordBlueTint3};
  }

  .modal__three-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  .modal__column-1-2-2 {
    display: grid;
    grid-template-columns: minmax(80px, 80px) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  .modal__one-line-form {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;

    & > *:not(:first-child) {
      margin-left: 14px;
    }
  }

  .modal__text-wrp {
    display: flex;
    justify-content: space-between;
  }

  .modal__text-btn {
    display: flex;
    color: ${props => props.theme.colors.oxfordBlue};
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 15px;
    cursor: pointer;

    :hover {
      text-decoration: underline;
    }
  }
`;
