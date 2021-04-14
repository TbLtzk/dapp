import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Row, Col, Container } from 'react-bootstrap';

import Button from 'components/Base/Buttons/Button';
import ButtonLink from 'components/Base/Buttons/ButtonLink';

import { Header, Body, Footer, ModalW } from './styles';

function ModalWindow(props) {
  const { disabled, show, onHide, backBtnTitle, backBtnHandler,
    continueBtnTitle, continueBtnHandler, content } = props;

  return (
    <ModalW
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Header>
      <Body>
        {content}
      </Body>
      <Footer>
        <Container>
          <Row>
            <Col md={6}>
              {!backBtnTitle ? null :
                <ButtonLink
                  width="100%"
                  title={backBtnTitle}
                  handleLink={backBtnHandler}
                />
              }
            </Col>
            <Col md={6}>
              <Button
                type="usual"
                width="100%"
                disabled={disabled}
                title={continueBtnTitle}
                handleButton={continueBtnHandler}
              />
            </Col>
          </Row>
        </Container>

      </Footer>
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

