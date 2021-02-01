import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import DefaultAllocationProxy from 'contracts/src/proxy/DefaultAllocationProxy';
import RootNodeRewardProxy from 'contracts/src/proxy/RootNodeRewardProxy';
import ValidationRewardProxy from 'contracts/src/proxy/ValidationRewardProxy';
import { bn, fN } from 'func/useful';

export default class Handler {
  constructor(drizzle, userAddress) {
    this.drizzle = drizzle;
    this.userAddress = userAddress;
    this.DefaultAllocationProxy = new DefaultAllocationProxy('DefaultAllocationProxy');
    this.RootNodeRewardProxy = new RootNodeRewardProxy('RootNodeRewardProxy');
    this.ValidationRewardProxy = new ValidationRewardProxy('ValidationRewardProxy');
  }

  getBalanceValue(contract, stateSetter) {
    this.drizzle.web3.eth.getBalance(contractsToAddresses[contract])
      .then(
        res => {
          let transf = this.drizzle.web3.utils.fromWei(res);
          transf = fN(bn(transf)
            .toString());
          stateSetter(transf);
        }
      )
      .catch(e => {
        stateSetter(0);
      });
  }

  allocateValue(contract, stateSetter, stateLoading) {
    contract.allocate(this.userAddress)
      .then(val => {
        this.getBalanceValue(contract.contractName, stateSetter);
        stateLoading(false);
      })
      .catch(e => {
        console.log('e', e);
        stateSetter(0);
        stateLoading(false);
      });
  }

  getDefaultAllocationProxy(stateSetter, stateLoading, isAllocate, allocateStateSetters) {
    stateLoading(true);
    if (isAllocate) {
      this.allocateValue(this.DefaultAllocationProxy, stateSetter, stateLoading);
    } else {
      this.getBalanceValue('DefaultAllocationProxy', stateSetter);
    }
  }

  getRootNodeRewardProxy(stateSetter, stateLoading, isAllocate) {
    stateLoading(true);
    if (isAllocate) {
      this.allocateValue(this.RootNodeRewardProxy, stateSetter, stateLoading);
    } else {
      this.getBalanceValue('RootNodeRewardProxy', stateSetter);
    }

  }

  getValidationRewardProxy(stateSetter, stateLoading, isAllocate) {
    stateLoading(true);
    if (isAllocate) {
      this.ValidationRewardProxy.allocate(this.userAddress)
        .then(val => {
          this.drizzle.web3.eth.getBalance(contractsToAddresses.ValidationRewardProxy)
            .then(
              res => {
                let transf = this.drizzle.web3.utils.fromWei(res);
                // console.log("transf", transf);
                // transf = (bn(transf)
                //   .toString());
                stateSetter(transf);
                stateLoading(false);
              }
            )
            .catch(e => {
              console.log('e', e);
              stateSetter(0);
              stateLoading(false);
            });
        })
        .catch(e => {
          console.log('e', e);
          stateSetter(0);
          stateLoading(false);
        });
    } else {
      this.drizzle.web3.eth.getBalance(contractsToAddresses.ValidationRewardProxy)
        .then(
          res => {
            let transf = this.drizzle.web3.utils.fromWei(res);
            // console.log("transf", transf);
            // transf = (bn(transf)
            //   .toString());
            stateSetter(transf);
            stateLoading(false);
          }
        )
        .catch(e => {
          console.log('e', e);
          stateSetter(0);
          stateLoading(false);
        });
    }

  }

  getQHolderRewardPool(stateSetter) {
    this.getBalanceValue('QHolderRewardPool', stateSetter);
  }

  getSystemReserve(stateSetter) {
    this.getBalanceValue('SystemReserve', stateSetter);
  }

  getValidationRewardPools(stateSetter) {
    this.getBalanceValue('ValidationRewardPools', stateSetter);
  }
}
