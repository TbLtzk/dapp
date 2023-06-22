import { toBigNumber } from '@q-dev/utils';
import { BigNumberish, utils } from 'ethers';

export function isAddress (value: string) {
  return utils.isAddress(value);
}

export function fromWei (value: BigNumberish, unitName?: BigNumberish) {
  return toBigNumber(utils.formatUnits(value, unitName)).toFixed();
}

export function toWei (value: string, unitName?: BigNumberish) {
  return utils.parseUnits(value, unitName).toString();
}
