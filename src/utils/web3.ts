import { BigNumberish, utils } from 'ethers';

export function isAddress (value: string) {
  return utils.isAddress(value);
}

export function fromWei (value: BigNumberish, unitName?: BigNumberish) {
  return utils.formatUnits(value, unitName);
}

export function toWei (value: string, unitName?: BigNumberish) {
  return utils.parseUnits(value, unitName).toString();
}
