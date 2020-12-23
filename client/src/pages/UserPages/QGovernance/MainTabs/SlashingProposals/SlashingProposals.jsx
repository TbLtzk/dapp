import React, {useEffect} from "react";

import {proposalsValidatorSlashing, loadingValidatorSlashing, errorMValidatorSlashing,} from "store/selectors/voting/validators-shashing-voting";
import {errorMRootNodesSlashing, loadingProposalsRootNodesSlashing, proposalsRootNodesSlashing,} from "store/selectors/voting/rootnodes-shashing-voting"
import {getValidatorsSlashingVotingProposals} from "store/actions/action-creaters/voting/validators-slashing-voting"
import {getRootNodesSlashingVotingProposals} from "store/actions/action-creaters/voting/rootnodes-slashing-voting"

import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";
import SlashingVoting from "api/contracts/Voting/SlashingVoting";
import ValidatorsSlashingVotingService from "api/contracts/Voting/ValidatorsSlashingVotingService";
import RootNodesSlashingVotingService from "api/contracts/Voting/RootNodesSlashingVotingService";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";

const {useDrizzle} = drizzleReactHooks;

function SlashingProposals() {
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();

    const contractRegistry = new ContractRegistryService(drizzle);

    const validatorsSlashingVoting = new ValidatorsSlashingVotingService(drizzle, "ValidatorsSlashingVoting");
    const rootNodesSlashingVoting = new RootNodesSlashingVotingService(drizzle, "RootNodesSlashingVoting");

    const loadingValidator = useSelector(loadingValidatorSlashing);
    const errorMessageValidator = useSelector(errorMValidatorSlashing);
    const proposalsValidator = useSelector(proposalsValidatorSlashing);
    const loadingRootNodes = useSelector(loadingProposalsRootNodesSlashing);
    const errorMessageRootNodes = useSelector(errorMRootNodesSlashing);
    const proposalsRootNodes = useSelector(proposalsRootNodesSlashing);

    useEffect(() => {
        dispatch(getValidatorsSlashingVotingProposals(validatorsSlashingVoting));
        dispatch(getRootNodesSlashingVotingProposals(rootNodesSlashingVoting));
    }, [dispatch]);

    useEffect(async () => {
        // contractRegistry.getAddress().then((address) => {
        //     console.log('EPQFI_MembershipVoting address', address);
        // });

    }, []);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr={(proposalsValidator?.length + proposalsRootNodes?.length ) + " POLLS"}
                activeContent={
                    <ProposalsList
                        activeTab="slashing"
                        proposals={[...proposalsValidator, ...proposalsRootNodes]}
                        loading={loadingValidator && loadingRootNodes}
                        errorMessage={errorMessageValidator || errorMessageRootNodes}
                        proposalsKind="SlashingProposals"
                    />
                }
                votableDesc="0 POLLS"
                votableContent={<p>Only votable</p>}
            />
        </Col>

    );
}

export default SlashingProposals;

