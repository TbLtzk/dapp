// eslint-disable-next-line max-classes-per-file
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';
import { getDelegationsList, getOutstandingDelegationRewards } from 'store/actions/action-creaters/q-piggy-bank';

import QPiggyBank from 'contracts/src/QPiggyBank';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { toWei } from 'func/balance';

export class ContractHandler {
  constructor(address, dispatch, alert) {
    this.piggyBank = new QPiggyBank(contractsToAddresses['QPiggyBank']);
    this.dispatch = dispatch;
    this.address = address;
    this.alert = alert;
  }

  async delegateStake(delegateAddresses, stakes) {
    this.dispatch(setTransactionCounter(1));

    this.piggyBank.delegateStake(this.address, delegateAddresses, stakes)
      .then(() => {
        this.dispatch(getOutstandingDelegationRewards());
        this.dispatch(getDelegationsList());
      })
      .catch((e) => {
        this.alert.error(e.message);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }
}

export class ComponentHandler {
  constructor(alert) {
    this.alert = alert;
  }

  getAddressesAndShares(applyZeroShare, userBalance) {
    const inputAddresses = [];
    const invalidAddressesKey = [];
    const inputShares = [];
    const invalidSharesKey = [];
    const inputContainers = document.querySelectorAll('.input_container .input_container_item');

    // Get all values from input containers
    inputContainers.forEach((element) => {
      inputAddresses.push(element.querySelector('.input_address input').value);
      inputShares.push(element.querySelector('.input_share input').value);
    });

    // Validate addresses
    inputAddresses.forEach((element, key) => {
      if (element.match(/^(0x)?[0-9a-fA-F]{40}$/i)) return;
      invalidAddressesKey.push(key);
    });

    // Validate shares
    let shareSum = 0;
    inputShares.forEach((element, key) => {
      const elementL = Number(element);

      if (applyZeroShare === true && (element.isNaN || element < 0)) {
        invalidSharesKey.push(key);
      } else if (applyZeroShare === false && (element.isNaN || element <= 0)) {
        invalidSharesKey.push(key);
      }

      shareSum += elementL;

      if (typeof elementL === 'number') {
        inputShares[key] = toWei(elementL);
      } else {
        inputShares[key] = 0;
      }
    });

    if (shareSum > userBalance) {
      this.alert.error('Shared sum should be less then PB balance!');
      invalidSharesKey.push(inputShares.length - 1);
    }

    // Setup or remove error messages
    inputContainers.forEach((element, key) => {
      const errorAddressCont = element.querySelector('.input_address p');
      const errorShareCont = element.querySelector('.input_share p');

      if (invalidAddressesKey.includes(key)) {
        errorAddressCont.innerHTML = 'Mistake in the address';
      } else {
        errorAddressCont.innerHTML = '';
      }

      if (invalidSharesKey.includes(key)) {
        errorShareCont.innerHTML = 'Wrong amount';
      } else {
        errorShareCont.innerHTML = '';
      }
    });

    if (invalidAddressesKey.length === 0 && invalidSharesKey.length === 0) {
      return {
        addresses: inputAddresses,
        shares: inputShares,
      };
    }
    return {
      addresses: [],
      shares: [],
    };
  }
}
