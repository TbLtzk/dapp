import React from "react";
import PropTypes from 'prop-types';

import {Modal} from "react-bootstrap";

import Button from "components/Base/Button";
import ButtonLink from "components/Base/ButtonLink";

import {Header, Body, Footer} from "./styles";

function ModalWindow(props) {
    const {show, onHide, continueBtnTitle, content} = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
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
                <ButtonLink
                    title="Back"
                    handleButton={onHide}
                />
                <Button
                    title={continueBtnTitle}
                    handleButton={onHide}
                />
            </Footer>
        </Modal>
    );
}

ModalWindow.propTypes = {
    continueBtnTitle: PropTypes.string,
    show: PropTypes.bool,
    content: PropTypes.object,
    onHide: PropTypes.func,
};

export default ModalWindow;

