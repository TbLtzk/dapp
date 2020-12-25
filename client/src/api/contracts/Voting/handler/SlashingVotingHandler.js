import SlashingVoting from "api/contracts/Voting/SlashingVoting";

export const chooseSlashingContractDependsOnType = (drizzle, type) => {
    let contractName = null;
    if (type === "root-node-slashing") {
        contractName = "RootNodesSlashingVoting";
    } else if (type === "validator-node-slashing") {
        contractName = "ValidatorsSlashingVoting";
    }
    const contract = new SlashingVoting(drizzle, contractName);

    return contract
};
