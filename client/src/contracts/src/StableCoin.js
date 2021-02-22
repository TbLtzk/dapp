/* eslint-disable max-classes-per-file */
import { contracts, web3 } from '../config/drizzle-config';
import { contractsToAddresses } from '../mapping/contract-to-address';
import { fromWei, toWei } from 'func/balance';

export class StableCoin {
  constructor() {
    this.methods = {};
    this.address = '';
  }

  async balanceOf(address) {
    return await this.methods.balanceOf(address)
      .call();
  }

  async decimals() {
    return await this.methods.decimals()
      .call();
  }

  async symbol() {
    return await this.methods.symbol()
      .call();
  }

  async approve(spender, amount, address) {
    // const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.approve(spender, amount)
      .send({ from: address });
  }

  async allowance(owner, spender) {
    return fromWei(await this.methods.allowance(owner, spender)
      .call());
  }

  async totalSupply() {
    // return new web3.utils.BN(web3.utils.fromWei(await this.methods.totalSupply()
    return fromWei(await this.methods.totalSupply()
      .call());
  }

  async mint(address, recepient, amount) {
    return await this.methods.mint(recepient, toWei(amount))
      .send({ from: address });
  }
}

export class StableCoinQUSD extends StableCoin {
  constructor() {
    super();
    this.methods = contracts.StableCoinQUSD.methods;
    this.address = contractsToAddresses.StableCoinQUSD;
  }
}

export class GovernedEpdrQethAddress extends StableCoin {
  constructor() {
    super();
    this.methods = contracts.GovernedEpdrQethAddress.methods;
    this.address = contractsToAddresses.GovernedEpdrQethAddress;
  }
}

export class GovernedEpdrQbtcAddress extends StableCoin {
  constructor() {
    super();
    this.methods = contracts.GovernedEpdrQbtcAddress.methods;
    this.address = contractsToAddresses.GovernedEpdrQbtcAddress;
  }
}
