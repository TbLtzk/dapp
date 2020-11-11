import React, {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";

import ModalWindow from "components/Base/ModalWindow";
import Button from "components/Base/Button";

function QGovernance() {
    const [modalShow, setModalShow] = useState(false);


    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h3>Q Governance</h3>
                    <Button
                        title="Launch"
                        handleButton={() => setModalShow(true)}
                        />
                    <ModalWindow
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        continueBtnTitle={"Confirm"}
                        content={
                            <>
                                <h4>Modal</h4>
                                <p>
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                    consectetur ac, vestibulum at eros.
                                </p>

                            </>
                        }
                    />
                </Col>
            </Row>
        </Container>

    );
}

export default QGovernance;

