import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { SavingQUSD } from 'contracts/Saving';
import { roundNumber } from 'func/useful';
import { web3 } from 'contracts/config/drizzle-config';
import { StableCoinQUSD } from 'contracts/StableCoin';

import { CardDetail } from '../styles';

export default function SavingBlock(props) {
  const { actCardData } = props;

  const [savingBalance, setSavingBalance] = useState(0);
  const [avToDeposit, setAvToDeposit] = useState(0);

  const address = useSelector(userAddressMetamask);
  const savingContract = new SavingQUSD();

  useEffect(async () => {
    if (actCardData.type !== 'saving') return;

    const userSaving = await savingContract.usersSavings(address).catch(() => {});
    setSavingBalance(userSaving.balance);

    const StableCoinQUSDContract = new StableCoinQUSD();
    let avToDepositL = await StableCoinQUSDContract.balanceOf().catch(() => {});
    avToDepositL = roundNumber(web3.utils.fromWei(new web3.utils.BN(avToDepositL)), 4);
    setAvToDeposit(avToDepositL);
  }, []);

  const deposit = (formData) => {
    savingContract.deposit(address, formData.field);
  };

  const withdraw = (formData) => {
    savingContract.withdraw(address, formData.field);
  };

  return (
    <Col xs={12}>
      <CardDetail>
        <p className="title-1">Save QUSD</p>
        <p className="title-2">Deposit</p>
        <div className="txt">
          <span>Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Saving Balance</span>
          <span>{savingBalance}</span>
        </div>
        <div className="txt">
          <span>Available to deposit</span>
          <span>{avToDeposit}</span>
        </div>
        <p className="title-2">Interest</p>
        <div className="txt">
          <span>Receive Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Estimated Interest</span>
          <span>{actCardData.intRate === undefined ? 0 : (avToDeposit * actCardData.intRate) / 100}</span>
        </div>
        <div className="txt">
          <span>Interest Rate p.a.</span>
          <span>{actCardData.intRate === undefined ? '-' : `${actCardData.intRate}%`}</span>
        </div>
        <div className="btn-group">
          <ButtonSlide
            btnTxt="Deposit Saving Asset"
            btnShortTxt="Deposit"
            onclick={deposit}
            inpType="number"
            inpPlaceholder="Amount (Q)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Withdraw Saving Asset"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="number"
            inpPlaceholder="Amount (Q)"
            inpRules={{ required: true }}
          />
        </div>
      </CardDetail>
    </Col>
  );
}

SavingBlock.propTypes = {
  actCardData: PropTypes.object.isRequired,
};
