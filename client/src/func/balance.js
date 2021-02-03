import { drizzleRegistry, web3 } from '../contracts/config/drizzle-config';

export const fromBtcBlockchain = (btc) => {
  if (btc.isNaN === true) return 0;
  return btc / 1e+8;
};

export const toBtcBlockchain = (num) => {
  if (num.isNaN === true) return 0;
  return num * 1e+8;
};

export const toWei = (value) => {
  return (drizzleRegistry.web3.utils.toWei(value, 'ether'));
  // return new web3.utils.BN(drizzleRegistry.web3.utils.toWei(value, 'ether'));
};

export const fromWei = (value) => {
  // return drizzleRegistry.web3.utils.fromWei((value), 'ether');
  return drizzleRegistry.web3.utils.fromWei(new web3.utils.BN(value), 'ether');
};
export const BN = (value) => {
  return new web3.utils.BN(value);
};
