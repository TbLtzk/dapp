import React from "react";

import {Row} from "react-bootstrap";
import Button from "components/Base/Buttons/Button";

import {Header, CardTitle, WrapBtnHeader, LabelStatus} from "./styles";

function CardHeader(props) {
    const {title, status, handleVote} = props;

    return (
        <Header>
            <Row>
                <CardTitle md={8}>
                    <p>{title}</p>
                </CardTitle>
                <WrapBtnHeader md={4}>
                    {!status ? null :
                        <LabelStatus>{status}</LabelStatus>
                    }
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

