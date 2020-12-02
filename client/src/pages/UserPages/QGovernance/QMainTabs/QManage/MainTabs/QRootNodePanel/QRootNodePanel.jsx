import React, {useEffect} from "react";
import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "../../components/QTypeProposalsTabs";
import ProposalsList from "../../components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";
import ConstitutionVotingService from "api/contracts/ConstitutionVotingService";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QRootNodePanel() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const contractRegistry = new ContractRegistryService(drizzle);
    const constitutionVoting = new ConstitutionVotingService(drizzle);
    const userAddress = useSelector(userAddressMetamask);

    const getPastEvents = async (contractName, event, options) => {
        const web3 = drizzle.web3;
        const contract = drizzle.contracts[contractName];
        console.log("contract", contract);
        const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
        console.log("yourContractWeb3", contractWeb3);
        // const result = await contractWeb3.getPastEvents(event, options, function(error, events){ console.log("events",events); });
        // const result = await contractWeb3.getPastEvents('ProposalCreated', {
        //     topics: [],
        //     // fromBlock: 0,
        //     // toBlock: 'latest'
        // });
        const result = await contractWeb3.getPastEvents('ProposalCreated', {
            topics: [],
            // fromBlock: 0,
            // toBlock: 'latest'
        });
        console.log("result", result);
        return result;
    };

    useEffect(async () => {
        // contractRegistry.getAddress().then((address) => {
        //     console.log('QRootNodePanel address', address);
        // });
        const eventOptions = {
            // fromBlock: 0,
            // toBlock: 'latest'
        };
        const eventsArray = await getPastEvents('RootsVoting', 'allEvents', eventOptions);
        // console.log("eventsArray rootnode", eventsArray);
        // const dummyHash = '0815';
        // const zeroAddress = '0x0000000000000000000000000000000000000000';
        // proposals
        const getProposals = await drizzle.contracts.RootsVoting.methods.proposals.cacheCall();
        // const createProposal = await drizzle.contracts.RootsVoting.methods.createProposal.cacheSend(
        //     dummyHash, userAddress, `www.q.org/addRoot-${userAddress.substr(2, 4)}`, zeroAddress,{ from: userAddress});
        console.log("getProposals", getProposals)
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

