import React from "react";

import {Row, Col} from "react-bootstrap";

import RootNodePanel from "components/Custom/RootNodePanel";
import FormStaking from "pages/UserPages/Staking/FormStaking";

import {WrapContainer} from "./styles"

function StakingContent() {

    return (
        <WrapContainer>
            <Col xs={6}>
                <FormStaking/>
            </Col>
            <Col xs={6}>
                <RootNodePanel
                    type="with-total"
                    bottom={true}
                />
            </Col>
        </WrapContainer>

    );
}

export default StakingContent;

