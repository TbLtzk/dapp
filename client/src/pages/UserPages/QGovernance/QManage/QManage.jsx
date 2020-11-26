import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import QProposals from "../QProposals";
import ButtonTabs from "components/Base/Tabs/ButtonTabs";

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
            <Col xs={12}>
                <ButtonTabs
                    tabsItems={tabsItems}
                />
            </Col>
        </Row>

    );
}

export default QManage;

