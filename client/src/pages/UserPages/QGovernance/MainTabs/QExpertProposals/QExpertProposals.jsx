import React, {useEffect} from "react";
import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";
import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QExpertProposals() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const contractRegistry = new ContractRegistryService(drizzle);

    // useEffect(async () => {
    // }, [state]);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr="11 POLLS - POSTED OCT 19, 2020, 16:00 UTC"
                activeContent={<ProposalsList data={"data"}/>}
                votableDesc="2 POLLS - POSTED OCT 19, 2020, 16:00 UTC"
                votableContent={<p>Only votable</p>}
            />
        </Col>

    );
}

export default QExpertProposals;

