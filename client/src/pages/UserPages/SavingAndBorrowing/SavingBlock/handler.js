import { roundNumber } from 'func/useful';
import { StableCoinQUSD } from '../../../../contracts/StableCoin';
import { web3 } from '../../../../contracts/config/drizzle-config';
import { SavingQUSD } from '../../../../contracts/Saving';

export default class Handler {
  constructor(address) {
    this.address = address;
    this.contractSavingQUSD = new SavingQUSD();
    this.contractStableCoinQUSD = new StableCoinQUSD();
  }

  setSavingBalance(stateSetter) {
    this.contractSavingQUSD.usersSavings(this.address).then((res) => {
      const resL = roundNumber(web3.utils.fromWei(res.balance), 4);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    });
  }

  setAvailableToDeposit(stateSetter) {
    this.contractStableCoinQUSD.balanceOf(this.address).then((res) => {
      const resL = roundNumber(web3.utils.fromWei(new web3.utils.BN(res)), 4);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    });
  }

  async deposit(amount, setterSavBal, setAvDep) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    const approve = await this.contractStableCoinQUSD.approve(this.contractSavingQUSD.address, amountL, this.address);
    if (approve.status === true) {
      this.contractSavingQUSD.deposit(this.address, amount).then(() => {
        this.setSavingBalance(setterSavBal);
        this.setAvailableToDeposit(setAvDep);
      }).catch((e) => { console.log(e); });
    }
  }

  async withdraw(amount, setterSavBal, setAvDep) {
    this.contractSavingQUSD.withdraw(this.address, amount).then(() => {
      this.setSavingBalance(setterSavBal);
      this.setAvailableToDeposit(setAvDep);
    }).catch((e) => { console.log(e); });
  }

  mint(amount, stateSetter) {
    this.contractStableCoinQUSD.mint(this.address, this.address, amount).then(() => {
      this.setAvailableToDeposit(stateSetter);
    }).catch((e) => { console.log(e); });
  }
}
