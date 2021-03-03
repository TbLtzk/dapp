import { contracts } from '../config/drizzle-config';

export default class QHolderRewardPool {

  constructor() {
    this.contract = contracts['QHolderRewardPool'];
    this.contractName = 'QHolderRewardPool';
  }

}
