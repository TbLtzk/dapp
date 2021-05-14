import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

import Button from 'components/Base/Buttons/Button';
import ButtonLink from 'components/Base/Buttons/ButtonLink';

import { Header, Body, Footer, ModalW } from './styles';

function ModalWindow(props) {
  const {
    disabled,
    show,
    onHide,
    backBtnTitle,
    backBtnHandler,
    continueBtnTitle,
    continueBtnHandler,
    content,
    modalTitle
  } = props;

  return (
    <ModalW
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Header closeButton>
        <Modal.Title>
          {modalTitle}
        </Modal.Title>
      </Header>
      <Body>
        {content}
      </Body>
      {(!backBtnTitle && !continueBtnTitle) ? null :
        <Footer>
          {!backBtnTitle ? null :
            <ButtonLink
              width="100%"
              title={backBtnTitle}
              handleLink={backBtnHandler}
            />
          }
          {!continueBtnTitle ? null :
            <Button
              type="usual"
              width="100%"
              disabled={disabled}
              title={continueBtnTitle}
              handleButton={continueBtnHandler}
            />
          }
        </Footer>
      }
    </ModalW>
  );
}

ModalWindow.propTypes = {
  continueBtnTitle: PropTypes.string,
  show: PropTypes.bool,
  content: PropTypes.object,
  onHide: PropTypes.func,
};

export default ModalWindow;

