import React from 'react';
import { useSelector } from 'react-redux';

import { savingAviableToDepositSelector, savingBalanceDetailsSelector } from 'store/saving-assets/selectors';

import { fN } from 'func/useful';

function SavingDetails ({ depositAsset, interestAsset }) {
  const availableToDeposit = useSelector(savingAviableToDepositSelector);
  const { interestRate, currentBalance, estimatedInterest } =
    useSelector(savingBalanceDetailsSelector);

  return (
    <>
      <div className="modal__line" />
      <h3>Deposit</h3>
      <div className="modal__three-colm">
        <div>
          <h5>Asset</h5>
          <p>{depositAsset}</p>
        </div>

        <div>
          <h5>Saving Balance</h5>
          <p>{fN(currentBalance)}</p>
        </div>

        <div>
          <h5>Available to Deposit</h5>
          <p>{fN(availableToDeposit)}</p>
        </div>
      </div>

      <div className="modal__line" />

      <h3>Interest</h3>
      <div className="modal__three-colm">
        <div>
          <h5>Receive Asset</h5>
          <p>{interestAsset}</p>
        </div>

        <div>
          <h5>Yearly Expected Reward</h5>
          <p>{fN(estimatedInterest)}</p>
        </div>

        <div>
          <h5>Saving Reward (p.a)</h5>
          <p>{fN(interestRate)} %</p>
        </div>
      </div>
    </>
  );
}

export default SavingDetails;
