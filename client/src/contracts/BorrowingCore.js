/* eslint-disable max-classes-per-file */
import { drizzle } from './config/drizzle-config';

class BorrowingCore {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
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
    return await this.methods.generateStc(vaultId, amount).send({ from: address });
  }

  async withdrawCol(address, vaultId, amount) {
    return await this.methods.withdrawCol(vaultId, amount).send({ from: address });
  }

  async payBackSTC(address, vaultId, amount) {
    return await this.methods.payBackSTC(vaultId, amount).send({ from: address });
  }

  async balanceOf(address) {
    return await this.methods.balanceOf(address).call();
  }
}

export class BorrowingCoreQUSD extends BorrowingCore {
}
