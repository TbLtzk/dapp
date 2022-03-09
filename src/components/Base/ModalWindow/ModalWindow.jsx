import React from 'react'
import PropTypes from 'prop-types'

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
  iconRight
}) {
  return (
        <ModalW
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backbtntitle={backBtnTitle}
        >
            <Header closeButton>
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

ModalWindow.propTypes = {
  continueBtnTitle: PropTypes.string,
  show: PropTypes.bool,
  content: PropTypes.object,
  onHide: PropTypes.func
}

export default ModalWindow
