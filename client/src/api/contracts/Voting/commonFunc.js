export const getPastEvents = async (drizzle, contractName, event) => {
    const web3 = drizzle.web3;
    const contract = drizzle.contracts[contractName];
    const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
    const eventOptions = {
        topics: [],
        fromBlock: 0,
        toBlock: 'latest'
    };
    const result = await contractWeb3.getPastEvents(event, eventOptions);
    console.log("ProposalCreated roots voting ", result);
    return result;
};

export const getPastProposalsIds = (proposalArr) => {
   return proposalArr?.map(evt => evt.returnValues._id);
};

export const getStatusTransformation = (statusId) => {
    switch (Number(statusId)) {
        case 0:
            return "none";
        case 1:
            return "executed";
        case 2:
            return "pending";
        case 3:
            return "rejected";
        case 4:
            return "accepted";
        case 5:
            return "passed";
        default:
            return "none";
    }
};
