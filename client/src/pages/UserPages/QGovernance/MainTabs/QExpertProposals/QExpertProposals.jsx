import React, {useEffect} from "react";

import {proposalsQExpert, loadingQExpert, errorQExpert} from "store/selectors/voting/qproposals"
import {getQExpertProposals} from "store/actions/action-creaters/voting/qproposals"

import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";
import EPQFI_MembershipVotingService from "api/contracts/Voting/EPQFI_MembershipVotingService";
import EPDR_MembershipVotingService from "api/contracts/Voting/EPDR_MembershipVotingService";
import EPQFI_ParametersVotingService from "api/contracts/Voting/EPQFI_ParametersVotingService";
import EPDR_ParametersVotingService from "api/contracts/Voting/EPDR_ParametersVotingService";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";

const {useDrizzle} = drizzleReactHooks;

function SlashingProposals() {
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();

    const contractRegistry = new ContractRegistryService(drizzle);

    const EPQFIMembershipVotingService = new EPQFI_MembershipVotingService(drizzle, "EPQFI_MembershipVoting");
    const EPDRMembershipVotingService = new EPDR_MembershipVotingService(drizzle, "EPDR_MembershipVoting");
    const EPQFIParametersVotingService = new EPQFI_ParametersVotingService(drizzle, "EPQFI_ParametersVoting");
    const EPDRParametersVotingService = new EPDR_ParametersVotingService(drizzle, "EPDR_ParametersVoting");

    const loading = useSelector(loadingQExpert);
    const error = useSelector(errorQExpert);
    const proposals = useSelector(proposalsQExpert);


    useEffect(() => {
        dispatch(getQExpertProposals([EPQFIMembershipVotingService, EPDRMembershipVotingService,
            EPQFIParametersVotingService, EPDRParametersVotingService]));
    }, [dispatch]);

    useEffect(async () => {
        // contractRegistry.getAddress().then((address) => {
        //     console.log('EPDR_ParametersVoting address', address);
        // });

    }, []);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr={proposals?.length + " POLLS"}
                activeContent={
                    <ProposalsList
                        activeTab="expert"
                        proposals={proposals}
                        loading={loading}
                        errorMessage={error}
                        proposalsKind="QExpertProposals"
                    />
                }
                votableDesc="0 POLLS"
                votableContent={<p>Only votable</p>}
            />
        </Col>

    );
}

export default SlashingProposals;

