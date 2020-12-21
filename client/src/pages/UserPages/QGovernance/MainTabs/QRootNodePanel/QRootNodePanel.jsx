import React, {useEffect} from "react";

import {
    proposalsArr, loadingProposals, errorM,
} from "store/selectors/voting/roots-voting"
import {getRootsVotingProposals} from "store/actions/action-creaters/voting/roots-voting"

import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";
import RootsVotingService from "api/contracts/Voting/RootsVotingService";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";

const {useDrizzle} = drizzleReactHooks;

function QRootNodePanel() {
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();

    const contractRegistry = new ContractRegistryService(drizzle);
    const rootsVotingService = new RootsVotingService(drizzle, "RootsVoting");

    const loading = useSelector(loadingProposals);
    const errorMessage = useSelector(errorM);
    const proposals = useSelector(proposalsArr);


    useEffect(() => {
        dispatch(getRootsVotingProposals(rootsVotingService))
    }, [dispatch]);

    // useEffect(async () => {
    //     contractRegistry.getAddress().then((address) => {
    //         console.log('Constitution address', address);
    //     });
    //
    // }, []);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr={proposals?.length + " POLLS"}
                activeContent={
                    <ProposalsList
                        proposals={proposals}
                        loading={loading}
                        errorMessage={errorMessage}
                        proposalsKind="QRootNodePanel"
                    />
                }
                votableDesc="0 POLLS"
                votableContent={<p>Only votable</p>}
            />
        </Col>

    );
}

export default QRootNodePanel;

