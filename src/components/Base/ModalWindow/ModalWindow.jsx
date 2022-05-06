import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'components/Base/Buttons/Button'

import { Header, Body, Footer, ModalW } from './styles'

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
            show={show}
            onHide={onHide}
            scrollable={scrollable}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backbtntitle={backBtnTitle}
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
                        <Button type="white" icon="arrow-left" title={backBtnTitle} handleButton={backBtnHandler} />
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
  )
}

export default ModalWindow
