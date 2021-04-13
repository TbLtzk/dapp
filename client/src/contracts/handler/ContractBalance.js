import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { BN, fN } from 'func/useful';
import { fromWei } from 'func/balance';

export default class ContractBalance {
  constructor(drizzle, userAddress) {
    this.drizzle = drizzle;
    this.userAddress = userAddress;
  }

  getBalanceValue(contract, stateSetter) {
    this.drizzle.web3.eth.getBalance(contractsToAddresses[contract])
      .then(
        res => {
          let transf = fromWei(res);
          transf = fN(BN(transf)
            .toFixed());
          stateSetter(transf);
        }
      )
      .catch(e => {
        stateSetter(0);
      });
  }
}
