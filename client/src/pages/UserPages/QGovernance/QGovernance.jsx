import React, {useMemo, useState} from "react";
import {Row, Col} from "react-bootstrap";

import ButtonTabs from "components/Base/Tabs/ButtonTabs";
import QProposals from "./MainTabs/QProposals";
import QRootNodePanel from "./MainTabs/QRootNodePanel";
import SlashingProposals from "./MainTabs/SlashingProposals";
import QExpertProposals from "./MainTabs/QExpertProposals";

import CreateQProposalBtn from "./components/CreateQProposalBtn";
import VotingStats from "./components/VotingStats";
import References from "./components/References";

import {WrapTabs} from "./styles";

function QGovernance() {

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "q-proposals",
                    title: "Q Proposals",
                    content: (
                        <WrapTabs>
                            <QProposals/>
                        </WrapTabs>
                    )
                },
                {
                    label: "q-root-node-panel",
                    title: "Q Root Node Panel",
                    content: (
                        <WrapTabs>
                            <QRootNodePanel/>
                        </WrapTabs>
                    )
                },
                {
                    label: "q-expert-proposals",
                    title: "Q Expert Proposals",
                    content: (
                        <WrapTabs>
                            <QExpertProposals/>
                        </WrapTabs>
                    )
                },
                {
                    label: "slashing-proposals",
                    title: "Slashing Proposals",
                    content: (
                        <WrapTabs>
                            <SlashingProposals/>
                        </WrapTabs>
                    )
                },
            ]
        )
    }, []);

    return (
        <Row>
            <Col md={8}>
                <ButtonTabs
                    tabsItems={tabsItems}
                />
            </Col>
            <Col md={4}>
                <CreateQProposalBtn/>
                <VotingStats/>
                <References/>
            </Col>
        </Row>
    );
}

export default QGovernance;

