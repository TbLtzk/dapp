import { drizzleRegistry, contracts } from '../config/drizzle-config';

export default class RootNodeRewardProxy {

  constructor() {
    this.contract = contracts['RootNodeRewardProxy'];
    this.contractName = 'RootNodeRewardProxy';
  }

}
