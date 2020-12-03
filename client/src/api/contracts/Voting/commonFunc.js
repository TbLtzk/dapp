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
    console.log("resultRootsVoting", result);
    return result;
};
