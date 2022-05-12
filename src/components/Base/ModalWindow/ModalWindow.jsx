import React from 'react';
import { Modal } from 'react-bootstrap';

import Button from 'components/Base/Button';

import { Body, Footer, Header, ModalW } from './styles';

function ModalWindow ({
  disabled,
  show,
  onHide,
  backBtnTitle,
  backBtnHandler,
  continueBtnTitle,
  continueBtnHandler,
  content,
  modalTitle,
  iconRight,
  closeButton = true,
  scrollable = true
}) {
  return (
    <ModalW
      centered
      show={show}
      scrollable={scrollable}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backbtntitle={backBtnTitle}
      onHide={onHide}
    >
      <Header closeButton={closeButton}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Header>
      <Body>{content}</Body>
      {!backBtnTitle && !continueBtnTitle
        ? null
        : (
          <Footer>
            {!backBtnTitle
              ? null
              : (
                <Button look="white" onClick={backBtnHandler}>
                  <i className="mdi mdi-arrow-left" />
                  <span>{backBtnTitle}</span>
                </Button>
              )}
            {!continueBtnTitle
              ? null
              : (
                <Button
                  alwaysEnabled
                  disabled={disabled}
                  onClick={continueBtnHandler}
                >
                  <span>{continueBtnTitle}</span>
                  <i className={`mdi mdi-${iconRight || 'arrow-right'}`} />
                </Button>
              )}
          </Footer>
        )}
    </ModalW>
  );
}

export default ModalWindow;
