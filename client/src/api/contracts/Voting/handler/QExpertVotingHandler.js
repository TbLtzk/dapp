import MembershipVoting from "api/contracts/Voting/MembershipVoting";
import ParametersVoting from "api/contracts/Voting/ParametersVoting";

export const chooseExpertContractDependsOnType = (drizzle, typeContract, type) => {
    let contract = null;
    let contractName = null;
    if (type === "q-fees-&-incentives-expert-panel") {
        if (typeContract === "member") {
            contractName = "EPQFI_MembershipVoting";
            contract = new MembershipVoting(drizzle, contractName);
        } else if (typeContract === "parameters") {
            contractName = "EPQFI_ParametersVoting";
            contract = new ParametersVoting(drizzle, contractName);
        }

    } else if (type === "q-defi-(decentralized-finance)-expert-panel") {
        if (typeContract === "member") {
            contractName = "EPDR_MembershipVoting";
            contract = new MembershipVoting(drizzle, contractName);
        } else if (typeContract === "parameters") {
            contractName = "EPDR_ParametersVoting";
            contract = new ParametersVoting(drizzle, contractName);
        }
    }

    return contract
};
