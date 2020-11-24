import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import StakingContent from "./StakingContent";
import TabsView from "components/Base/TabsView";

function Staking() {

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "root-node-staking",
                    title: "Root Node Staking",
                    content: <StakingContent/>
                },
                {
                    label: "validator-staking",
                    title: "Validator Staking",
                    content: <p>Validator Staking</p>
                },
            ]
        )
    }, []);

    return (
        <Row>
            <Col xs={12}>
                <TabsView
                    tabsItems={tabsItems}
                />
            </Col>
        </Row>

    );
}

export default Staking;

