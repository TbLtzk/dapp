import { BigNumber } from 'bignumber.js';

export const getPastEvents = async (drizzle, contractName, event) => {
  const web3 = drizzle.web3;
  const contract = drizzle.contracts[contractName];
  const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
  const eventOptions = {
    // topics: [],
    fromBlock: 0,
    toBlock: 'latest'
  };
  const result = await contractWeb3.getPastEvents(event, eventOptions);
  return result;
};

export const getPastProposalsIds = (proposalArr) => {
  return proposalArr?.map(evt => evt.returnValues._id);
};

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Executed', 'Obsolete', 'Expired'];
  return status[Number(statusId)];
};
export const getTypeParameter = (id) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Boolean', 'Obsolete'];
  return status[Number(id)];
};
export const getParameterTypeTransformation = (statusId) => {
  switch (Number(statusId)) {
    case 0:
      return 'None';
    case 1:
      return 'Address';
    case 2:
      return 'Uint';
    case 3:
      return 'String';
    case 4:
      return 'Byte32';
    case 5:
      return 'Bool';
    default:
      return 'None';
  }
};

export const convertNumVotes = (number) => {
  if (number.length === 1) {
    return Number(number);
  } else if (number.length === 27) {
    // const result = toFixed(number);
    const res = number.slice(0, 2);
    return res * 0.01;

  } else if (number.length === 26) {
    const res = number.slice(0, 1);
    return res * 0.01;

  } else {
    const res = number.slice(0, 2);
    return res * 0.001;
  }
};

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString()
      .split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + (new Array(e)).join('0') + x.toString()
        .substring(2);
    }
  } else {
    var e = parseInt(x.toString()
      .split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e + 1)).join('0');
    }
  }
  console.log('toFixed', x);
  return x;
}

export const getPercentageFormat = (number) => {
  return bn(1e+27)
    .multipliedBy(number)
    .dividedBy(100);
};

export const transformToPercentage = (number) => {
  const amount = '10000000000000000000000000';
  let convertedNumber = bn(number)
    .dividedBy(amount);
  if (convertedNumber?.e < 0) {
    convertedNumber = ((convertedNumber)).toFixed(10);
  } else {
    convertedNumber = Math.round(convertedNumber?.c[0]);
  }
  return convertedNumber;
};

export const bn = (number) => {
  return new BigNumber(number);
};

export const calculatePercentage = (part, amount) => {
  return bn(((10 ** 27) * part) / amount);

};
