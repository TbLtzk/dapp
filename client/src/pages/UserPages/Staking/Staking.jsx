import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import StakingContent from "./StakingContent";
import BigTabsView from "components/Base/Tabs/BigTabsView";

function Staking() {

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "root-node-staking",
                    title: "Root Node EndedProposals",
                    content: <StakingContent/>
                },
                {
                    label: "validator-staking",
                    title: "Validator EndedProposals",
                    content: <p>Validator Staking</p>
                },
            ]
        )
    }, []);

    return (
        <Row>
            <Col xs={12}>
                <BigTabsView
                    tabsItems={tabsItems}
                />
            </Col>
        </Row>

    );
}

export default Staking;

