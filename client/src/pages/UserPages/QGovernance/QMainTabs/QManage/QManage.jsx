import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import QProposals from "./QProposals";
import VotingStats from "./VotingStats";
import ButtonTabs from "components/Base/Tabs/ButtonTabs";

import CreateQProposalBtn from "./CreateQProposalBtn";

function QManage() {

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "q-proposals",
                    title: "Q Proposals",
                    content: <QProposals/>
                },
                {
                    label: "q-root-node-panel",
                    title: "Q Root Node Panel",
                    content: (
                        <p>Q Root Node Panel</p>
                    )
                },
                {
                    label: "q-expert-proposals",
                    title: "Q Expert Proposals",
                    content: (
                        <p>Q Expert Proposals</p>

                    )
                },
                {
                    label: "slashing-proposals",
                    title: "Slashing Proposals",
                    content: (
                        <p>Slashing Proposals</p>
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
            </Col>
        </Row>

    );
}

export default QManage;

