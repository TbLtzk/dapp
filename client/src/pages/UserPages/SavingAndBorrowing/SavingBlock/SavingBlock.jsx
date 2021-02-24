import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { fN } from 'func/useful';
import Handler from './handler';

import { CardDetail } from '../styles';

export default function SavingBlock(props) {
  const { actCardData } = props;

  const [savingBalance, setSavingBalance] = useState(0);
  const [interestRate, setInterestRate] = useState('-');

  const [avToDeposit, setAvToDeposit] = useState(0);
  const [estInterest, setEstInterest] = useState(0);

  const [allowance, setAllowance] = useState(0);
  const [depositBtnTitle, setDepositBtnTitle] = useState('Deposit');

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, useDispatch());

  useEffect(async () => {
    if (actCardData.type !== 'saving') return;

    handler.setSavingBalanceIntRateEstInterest(setSavingBalance, setInterestRate, setEstInterest);
    handler.setAvailableToDeposit(setAvToDeposit);
    handler.allowance(setAllowance);
    // await handler.approve();
  }, [actCardData]);

  const deposit = async (formData) => {
    if (depositBtnTitle === 'Approve') {
      await handler.approve();
      handler.allowance(setAllowance);
      setDepositBtnTitle('Deposit');
    } else {
      await handler.deposit(formData.field, setSavingBalance, setAvToDeposit, setInterestRate, setEstInterest);
    }
  };

  const withdraw = (formData) => {
    handler.withdraw(formData.field, setSavingBalance, setAvToDeposit, setInterestRate, setEstInterest);
  };

  const onChangeValueBtnSlide = async (value) => {
    const inputValue = value.target.value;
    if (Number(allowance) < Number(inputValue)) {
      setDepositBtnTitle('Approve');
    } else {
      setDepositBtnTitle('Deposit');
    }
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
          <span>{fN(savingBalance)}</span>
        </div>
        <div className="txt">
          <span>Available to deposit</span>
          <span>{fN(avToDeposit)}</span>
        </div>
        <p className="title-2">Interest</p>
        <div className="txt">
          <span>Receive Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Estimated Interest</span>
          <span>{fN(estInterest)}</span>
        </div>
        <div className="txt">
          <span>Interest Rate p.a.</span>
          <span>{`${fN(interestRate)}%`}</span>
        </div>
        <div className="btn-group">
          <ButtonSlide
            btnTxt="Deposit Saving Asset"
            btnShortTxt={depositBtnTitle}
            onclick={deposit}
            inpType="text"
            inpPlaceholder="Amount (QUSD)"
            inpRules={{ required: true }}
            onChange={(value) => {
              onChangeValueBtnSlide(value);
            }}
          />
          <ButtonSlide
            btnTxt="Withdraw Saving Asset"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="text"
            inpPlaceholder="Amount (QUSD)"
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
