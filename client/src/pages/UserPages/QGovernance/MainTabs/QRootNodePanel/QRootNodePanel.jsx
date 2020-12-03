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
import {userAddressMetamask} from "store/selectors/user-inf";
import {getPastEvents} from "api/contracts/Voting/commonFunc";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QRootNodePanel() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const dispatch = useDispatch();

    const contractRegistry = new ContractRegistryService(drizzle);
    const rootsVotingService = new RootsVotingService(drizzle);
    const userAddress = useSelector(userAddressMetamask);

    const loading = useSelector(loadingProposals);
    const errorMessage = useSelector(errorM);
    const proposals = useSelector(proposalsArr);

    useEffect(() => {
        dispatch(getRootsVotingProposals(rootsVotingService))
    }, [dispatch]);

    // const getPastEvents = async (contractName, event, options) => {
    //     const web3 = drizzle.web3;
    //     const contract = drizzle.contracts[contractName];
    //     const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
    //     const result = await contractWeb3.getPastEvents(event, options);
    //     console.log("resultRootsVoting", result);
    //     return result;
    // };

    useEffect(async () => {
        // contractRegistry.getAddress().then((address) => {
        //     console.log('QRootNodePanel address', address);
        // });
        //
        // const proposalEvents = await getPastEvents(drizzle,'RootsVoting', 'ProposalCreated');
        // console.log("proposalEvents rootnode", proposalEvents);
        // const proposalIds = proposalEvents.map(evt => evt.returnValues._id);
        // console.log("proposalIds", proposalIds);
        // const result = await drizzle.contracts.RootsVoting.methods.getProposal(proposalIds[0]).call();
        // const calls = proposalIds.map(id => drizzle.contracts.RootsVoting.methods.getProposal(id).call());
        // const result = await Promise.all(calls);
        // console.log("result", result);


    }, []);

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

export default QRootNodePanel;

