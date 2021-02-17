/* eslint-disable max-classes-per-file */
import { contracts, web3 } from '../config/drizzle-config';
import { contractsToAddresses } from '../mapping/contract-to-address';

class BorrowingCore {
  constructor() {
    this.methods = {};
    this.address = '';
  }

  async userVaultsCount(address) {
    return await this.methods.userVaultsCount(address).call();
  }

  async userVaults(address, vaultNum) {
    return await this.methods.userVaults(address, vaultNum).call();
  }

  async createVault(address, collateral) {
    return await this.methods.createVault(collateral).send({ from: address });
  }

  async depositCol(address, vaultId, amount) {
    return await this.methods.depositCol(vaultId, amount).send({ from: address });
  }

  async generateStc(address, vaultId, amount) {
    const amountL = new web3.utils.BN(amount);
    return await this.methods.generateStc(vaultId, amountL).send({ from: address });
  }

  async payBackSTC(address, vaultId, amount) {
    const amountL = new web3.utils.BN(amount);
    return await this.methods.payBackSTC(vaultId, amountL).send({ from: address });
  }

  async withdrawCol(address, vaultId, amount) {
    return await this.methods.withdrawCol(vaultId, amount).send({ from: address });
  }

  async balanceOf(address) {
    return await this.methods.balanceOf(address).call();
  }

  async compoundRateKeeper() {
    return await this.methods.compoundRateKeeper()
      .call();
  }

  async updateCompoundRate(address) {
    return await this.methods.updateCompoundRate()
      .send({ from: address });
  }
}

export class BorrowingCoreQUSD extends BorrowingCore {
  constructor() {
    super();
    this.methods = contracts['BorrowingCoreQUSD'].methods;
    this.address = contractsToAddresses['BorrowingCoreQUSD'];
  }
}
