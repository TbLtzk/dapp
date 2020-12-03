import React from "react";
import {Row, Col} from "react-bootstrap";

import UserData from "components/Custom/UserData"

function WelcomePage() {


    return (
        <Row>
            <Col xs={12}>
                <h3>Welcome Q</h3>
                <UserData />
            </Col>
        </Row>
    );
}

export default WelcomePage;

