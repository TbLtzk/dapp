import React from "react";
import {Row, Col} from "react-bootstrap";

import CustomBlock from "components/Base/CustomBlock";
import ButtonLinkArrow from "components/Base/ButtonLinkArrow";

import {
    WrapTitleBlock, Title, WrapTitle, BlockWrap, WrapBtnView, WrapDescr,
    WrapDescrTitle
} from "pages/UserPages/QGovernance/components/VotingStats/styles";

function VotingStats() {
    return (
        <BlockWrap>
            <WrapTitleBlock>
                <WrapTitle md={7}><Title>Voting Stats</Title></WrapTitle>
                <WrapBtnView md={5}>
                    <ButtonLinkArrow
                        title="View Details"
                        path="/piggy-bank"
                    />
                </WrapBtnView>
            </WrapTitleBlock>
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

