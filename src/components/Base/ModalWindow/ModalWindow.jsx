import { Modal } from 'react-bootstrap';

import Button from 'components/Base/Button';

import { Body, Footer, Header, ModalContainer } from './styles';

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
  width,
  closeButton = true,
  scrollable = true,
}) {
  return (
    <ModalContainer
      centered
      show={show}
      scrollable={scrollable}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backbtntitle={backBtnTitle}
      $width={width}
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
    </ModalContainer>
  );
}

export default ModalWindow;
