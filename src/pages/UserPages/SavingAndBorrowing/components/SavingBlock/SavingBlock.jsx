import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import { LoadingWrap } from 'components/Custom/MembersPanel/styles';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ShowListElem from '../ShowListElem';

import { fN } from 'func/useful';
import Handler from './handler';

import { Col } from 'react-bootstrap';
import { CardDetail } from '../../styles';

export default function SavingBlock(props) {
  const { actCardData } = props;

  const [loadingInf, setLoadingInf] = useState(true);
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

    handler.setAvailableToDeposit(setAvToDeposit);
    handler.setSavingBalanceIntRateEstInterest(setSavingBalance, setInterestRate, setEstInterest,
      setLoadingInf);
    handler.allowance(setAllowance);
    // await handler.approve();
  }, [actCardData]);

  const deposit = async (formData) => {
    if (depositBtnTitle === 'Approve') {
      await handler.approve();
      handler.allowance(setAllowance);
      setDepositBtnTitle('Deposit');
    } else {
      await handler.deposit(formData.field, setSavingBalance, setAvToDeposit, setInterestRate, setEstInterest,
        setLoadingInf);
    }
  };

  const withdraw = useCallback((formData) => {
    handler.withdraw(formData.field, setSavingBalance, setAvToDeposit, setInterestRate, setEstInterest,
      setLoadingInf);
  }, [actCardData]);

  const onChangeValueBtnSlide = async (value) => {
    const inputValue = value.target.value;
    if (Number(allowance) < Number(inputValue)) {
      setDepositBtnTitle('Approve');
    } else {
      setDepositBtnTitle('Deposit');
    }
  };

  const depositInfArr = useMemo(() => {
    return [
      {
        label: 'Asset',
        value: 'QUSD'
      },
      {
        label: 'Saving balance',
        value: fN(savingBalance)
      },
      {
        label: 'Available to deposit',
        value: fN(avToDeposit)
      },
    ];
  }, [savingBalance, avToDeposit]);
  const interestInfArr = useMemo(() => {
    return [
      {
        label: 'Receive asset',
        value: 'QUSD'
      },
      {
        label: 'Yearly expected reward',
        value: fN(estInterest)
      },
      {
        label: 'Saving reward (p.a)',
        value: fN(interestRate) + '%'
      },
    ];
  }, [estInterest, interestRate]);

  return (
    <Col xs={12}>
      <CardDetail>
        <p className="title-1">Save QUSD</p>
        {loadingInf ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
          <>
            <p className="title-2">Deposit</p>
            {ShowListElem(depositInfArr)}
            <p className="title-2">Reward</p>
            {ShowListElem(interestInfArr)}
          </>
        }

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
