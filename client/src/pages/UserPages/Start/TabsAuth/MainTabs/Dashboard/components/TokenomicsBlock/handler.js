import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import DefaultAllocationProxy from 'contracts/src/proxy/DefaultAllocationProxy';
import RootNodeRewardProxy from 'contracts/src/proxy/RootNodeRewardProxy';
import ValidationRewardProxy from 'contracts/src/proxy/ValidationRewardProxy';
import { bn, fN } from 'func/useful';

export default class Handler {
  constructor(drizzle) {
    this.drizzle = drizzle;
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

  getDefaultAllocationProxy(stateSetter, stateLoading) {
    stateLoading(true);
    this.DefaultAllocationProxy.allocate()
      .then(val => {
        this.getBalanceValue('DefaultAllocationProxy', stateSetter);
        stateLoading(false);
      })
      .catch(e => {
        console.log('e', e);
        stateSetter(0);
        stateLoading(false);
      });
  }

  getRootNodeRewardProxy(stateSetter, stateLoading) {
    stateLoading(true);
    this.RootNodeRewardProxy.allocate()
      .then(val => {
        this.getBalanceValue('RootNodeRewardProxy', stateSetter);
        stateLoading(false);
      })
      .catch(e => {
        console.log('e', e);
        stateSetter(0);
        stateLoading(false);
      });
  }

  getValidationRewardProxy(stateSetter, stateLoading) {
    stateLoading(true);
    this.ValidationRewardProxy.allocate()
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
