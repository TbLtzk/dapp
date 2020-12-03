import React from "react";

import {Row} from "react-bootstrap";
import Button from "components/Base/Button";

import {Header, CardTitle, WrapBtnHeader} from "pages/UserPages/QGovernance/components/ProposalsList/CardHeader/styles";

function CardHeader(props) {
    const {title, handleVote} = props;

    return (
        <Header>
            <Row>
                <CardTitle md={10}>
                    <p>{title}</p>
                </CardTitle>
                <WrapBtnHeader md={2}>
                    <Button
                        title="Vote"
                        type="white"
                        handleButton={handleVote}
                    />

                </WrapBtnHeader>
            </Row>

        </Header>
    );
}

export default CardHeader;

