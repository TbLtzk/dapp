import React, {useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import BigTabsView from "components/Base/Tabs/BigTabsView";

import {WrapDescr} from "pages/UserPages/QGovernance/components/QTypeProposalsTabs/styles"

function QTypeProposalsTabs(props) {
    const {activeDescr, votableDesc, activeContent, votableContent} = props;

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "active-proposals",
                    title: (
                        <>
                            <p>Active Proposals</p>
                            <WrapDescr>{activeDescr}</WrapDescr>
                        </>
                    ),
                    content: activeContent
                },
                {
                    label: "only-votable",
                    title: (
                        <>
                            <p>Only votable</p>
                            <WrapDescr>{votableDesc}</WrapDescr>
                        </>
                    ),
                    content: votableContent
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

export default QTypeProposalsTabs;

