import React, {useEffect} from "react";
import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";
import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QProposals() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    // const contractRegistry = new ContractRegistryService(drizzle);
    const constitutionVoting = new ConstitutionVotingService(drizzle);

    const getPastEvents = async (contractName, event, options) => {
        const web3 = drizzle.web3;
        const contract = drizzle.contracts[contractName];
        console.log("contract", contract);
        const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
        console.log("yourContractWeb3", contractWeb3);
        // const result = await contractWeb3.getPastEvents(event, options, function(error, events){ console.log("events",events); });
        const result = await contractWeb3.getPastEvents('ProposalCreated', {
            // topics: [],
            // fromBlock: 0,
            // toBlock: 'latest'
        });
        console.log("result", result);
        return result;
    };

    useEffect(async () => {
        // constitutionVoting.getCreatedProposals().then((proposals) => {
        //     console.log('ConstitutionVotingService proposals', proposals);
        // });
        const eventOptions = {
            // fromBlock: 0,
            // toBlock: 'latest'
        };
        // const eventsArray = await getPastEvents('ConstitutionVoting', 'allEvents', eventOptions);
        // const eventsArray = await getPastEvents('ConstitutionVoting', 'ProposalCreated', eventOptions);
        // const proposalEvents = await drizzle.contracts.ConstitutionVoting.getPastEvents("ProposalCreated",{ fromBlock: 0, toBlock: 'latest' });
        // const proposalEvents = await drizzle.contracts.ConstitutionVoting.getPastEvents("ProposalCreated",{ fromBlock: 0, toBlock: 'latest' });
        // const proposalEvents = await drizzle.contracts.ConstitutionVoting.events.ProposalCreated({},{ fromBlock: 0, toBlock: 'latest' },(error, eventResult) => {
        //     console.log('Error in myEvent event handler: ' + error);
        //     console.log('eventResult in myEvent event handler: ' + eventResult);
        // });
        // "0x20fbe62ddda434466c9ee6ff4ac1ec7f"
        // const getStatus = await drizzle.contracts.ConstitutionVoting.methods.getStatus("0x20fbe62ddda434466c9ee6ff4ac1ec7f").call();
        // getStatus
        // const proposalIds = proposalEvents.map(evt => evt.returnValues._id);
        // drizzle.contracts.ConstitutionVoting.events.ProposalCreated({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
        //     if (error)
        //         console.log('Error in myEvent event handler: ' + error);
        //     else
        //         console.log('myEvent: ' + JSON.stringify(eventResult.args));
        // });

        // console.log("eventsArray", eventsArray);
        // console.log("proposalEvents", proposalEvents);
        // console.log("getStatus", getStatus);
        // "0xf040e0baef7bbe37c984e476ca5e24fe"
        // console.log("proposalIds", proposalIds);
    }, [state]);

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

export default QProposals;

