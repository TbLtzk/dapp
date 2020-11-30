import React, {useEffect, useMemo} from "react";
import {Row, Col} from "react-bootstrap";

import BigTabsView from "components/Base/Tabs/BigTabsView/";
import ActiveQProposal from "./ActiveQProposal";

import {WrapDescr, WrapTabs} from "./styles"
import ContractRegistryService from "api/contracts/ContractRegistryService";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QProposals() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const contractRegistry = new ContractRegistryService(drizzle);

    // useEffect(async() => {
    //     contractRegistry.getAddress().then((address) => {
    //         console.log('ConstitutionParametersVoting address', address);
    //     });
    // });

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "active-proposals",
                    title: (
                        <>
                            <p>Active Proposals</p>
                            <WrapDescr>11 POLLS - POSTED OCT 19, 2020, 16:00 UTC</WrapDescr>
                        </>
                    ),
                    content: (
                        <ActiveQProposal/>
                    )
                },
                {
                    label: "only-votable",
                    title: (
                        <>
                            <p>Only votable</p>
                            <WrapDescr>2 POLLS - POSTED OCT 19, 2020, 16:00 UTC</WrapDescr>
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
        <WrapTabs>
            <Col xs={12}>
                <BigTabsView
                    tabsItems={tabsItems}
                />
            </Col>
        </WrapTabs>

    );
}

export default QProposals;

