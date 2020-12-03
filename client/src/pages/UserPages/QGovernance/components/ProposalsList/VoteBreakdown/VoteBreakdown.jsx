import React from "react";

import {Container, Row, Col} from "react-bootstrap";

import {Text, Title} from "pages/UserPages/QGovernance/components/ProposalsList/VoteBreakdown/styles";

function VoteBreakdown() {

    return (
        <div>
            <Title>Result</Title>
            <Row>
                <Col md={4}>
                    <p>Vote Results</p>
                    <p>Majority Requirement; 50%</p>

                </Col>
                <Col md={4}>
                    <p>Constitution Check</p>
                    <p>Objection Requirement: 50%</p>

                </Col>
                <Col md={4}>
                    <p>Q Community Veto</p>
                    <p>Veto Requirement: 20,6%</p>

                </Col>
            </Row>
            <Title>Vote Requirements</Title>
            <Text>
                https://www.reddit.com/r/Bitcoin/comments/jkmnjj/i_bought_a_used_truck_for_215_bitcoin/
            </Text>
        </div>
    );
}

export default VoteBreakdown;

