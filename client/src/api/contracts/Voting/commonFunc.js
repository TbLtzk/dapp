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
    // console.log("ProposalCreated roots voting ", result);
    return result;
};

export const getPastProposalsIds = (proposalArr) => {
    return proposalArr?.map(evt => evt.returnValues._id);
};

export const getStatusTransformation = (statusId) => {
    switch (Number(statusId)) {
        case 0:
            return "None";
        case 1:
            return "Executed";
        case 2:
            return "Pending";
        case 3:
            return "Rejected";
        case 4:
            return "Accepted";
        case 5:
            return "Passed";
        default:
            return "None";
    }
};
export const getParameterTypeTransformation = (statusId) => {
    switch (Number(statusId)) {
        case 0:
            return "None";
        case 1:
            return "Address";
        case 2:
            return "Uint";
        case 3:
            return "String";
        case 4:
            return "Byte32";
        case 5:
            return "Bool";
        default:
            return "None";
    }
};

export const convertNumVotes = (number) => {
    if (number.length === 1) {
        return Number(number)
    } else if (number.length === 27) {
        // const result = toFixed(number);
        const res = number.slice(0, 2);
        return res * 0.01;

    } else if (number.length === 26) {
        const res = number.slice(0, 1);
        return res * 0.01;

    }else{
        const res = number.slice(0, 2);
        return res * 0.001;
    }
};

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    console.log("toFixed", x);
    return x;
}
