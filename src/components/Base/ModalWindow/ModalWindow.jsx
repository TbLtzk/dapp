import React from 'react';
import { Modal } from 'react-bootstrap';

import PropTypes from 'prop-types';

import Button from 'components/Base/Buttons/Button';

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
  closeButton = true
}) {
  return (
    <ModalW
      scrollable
      centered
      show={show}
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
                <Button
                  type="white"
                  icon="arrow-left"
                  title={backBtnTitle}
                  handleButton={backBtnHandler}
                />
              )}
            {!continueBtnTitle
              ? null
              : (
                <Button
                  alwaysEnabled
                  icon={iconRight || 'arrow-right'}
                  isIconPositionRight={true}
                  disabled={disabled}
                  title={continueBtnTitle}
                  handleButton={continueBtnHandler}
                />
              )}
          </Footer>
        )}
    </ModalW>
  );
}

ModalWindow.propTypes = {
  continueBtnTitle: PropTypes.string,
  show: PropTypes.bool,
  content: PropTypes.object,
  onHide: PropTypes.func
};

export default ModalWindow;
