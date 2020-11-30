import React from "react";
import {useHistory} from "react-router-dom";

import {Row, Col} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"

import CustomBlock from "components/Base/CustomBlock";
import ButtonLink from "components/Base/ButtonLink";

import {Title, BlockWrap, WrapBtnView, WrapDescr, WrapDescrTitle} from "./styles";

function VotingStats() {
    const history = useHistory();

    return (
        <BlockWrap>
            <Col md={7}><Title>Voting Stats</Title></Col>
            <WrapBtnView md={5}>
                <ButtonLink
                    title={
                        <>
                            <span>View Details</span>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </>
                    }
                    handleLink={() => history.push("/piggy-bank")}
                />

            </WrapBtnView>

            <CustomBlock>
                <Row>
                    <WrapDescrTitle md={6}>PiggyBank Voting Weight (Q)</WrapDescrTitle>
                    <WrapDescr md={6}>4563Q</WrapDescr>
                    <WrapDescrTitle md={6}>Voting Locking End</WrapDescrTitle>
                    <WrapDescr md={6}>3rd December 2026 15:51 UTC</WrapDescr>
                    <WrapDescrTitle md={6}>Voting Status</WrapDescrTitle>
                    <WrapDescr md={6}>Root Node</WrapDescr>
                </Row>

            </CustomBlock>
        </BlockWrap>


    );
}

export default VotingStats;

