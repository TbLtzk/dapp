import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import BigTabsView from "components/Base/Tabs/BigTabsView";

function QTabs(props) {
    const {activeDescr, votableDesc} = props;

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "active-proposals",
                    title: (
                        <>
                            <p>Active Proposals</p>
                            <p>11 POLLS - POSTED OCT 19, 2020, 16:00 UTC</p>
                        </>
                    ),
                    content: (
                        <p>Active Proposals</p>
                    )
                },
                {
                    label: "only-votable",
                    title: (
                        <>
                            <p>Only votable</p>
                            <p>2 POLLS - POSTED OCT 19, 2020, 16:00 UTC</p>
                        </>
                    ),
                    content: (
                        <p>Only votable</p>
                    )
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

export default QTabs;

