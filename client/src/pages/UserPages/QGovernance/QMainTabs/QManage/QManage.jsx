import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import QProposals from "./MainTabs/QProposals";
import QRootNodePanel from "./MainTabs/QRootNodePanel";

import ButtonTabs from "components/Base/Tabs/ButtonTabs";
import VotingStats from "./components/VotingStats";
import References from "./components/References";
import CreateQProposalBtn from "./components/CreateQProposalBtn";

import {WrapTabs} from "./styles"

function QManage() {

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
                <References/>
            </Col>
        </Row>

    );
}

export default QManage;

