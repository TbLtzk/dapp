import React from "react";
import ContractRegistry from './components/ContractRegistry'

import {Row, Col} from "react-bootstrap";
function Manage() {

    return (
        <Row>
            <Col md={12}>
                <ContractRegistry />
            </Col>
        </Row>

    );
}

export default Manage;

