import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ShowListElem from '../ShowListElem';

import { fN } from 'func/useful';
import Handler from './handler';

import { Col } from 'react-bootstrap';
import { LoadingWrap } from 'components/Custom/MembersPanel/styles';
import { CardDetail } from '../../styles';

export default function BorrowBlock(props) {
  const { actCardData } = props;
  const address = useSelector(userAddressMetamask);

  const [actCardDataInf, setActCardDataInf] = useState(actCardData);
  const handler = new Handler(address, actCardDataInf?.vault?.colKey, useDispatch(), actCardDataInf?.vault?.vaultNum);

  useEffect(() => {
    setActCardDataInf(actCardData);
  }, [actCardData]);


  const [collateralInf, setCollateralInf] = useState({});
  const [borrowingInf, setBorrowingInf] = useState({});
  const [loadingInf, setLoadingInf] = useState(true);

  const [repayBtnTitle, setRepayBtnTitle] = useState('Repay');
  const [depositBtnTitle, setDepositBtnTitle] = useState('Add');
  const [allowanceDeposit, setAllowanceDeposit] = useState(0);
  const [allowanceRepay, setAllowanceRepay] = useState(0);


  useEffect(async () => {
    if (actCardDataInf.type !== 'borrow') return;

    if (actCardDataInf?.collateral === 'QBTC') {
      await handler.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf);
      handler.allowanceSwitcher(setAllowanceDeposit, 'deposit');
      handler.allowanceSwitcher(setAllowanceRepay, 'repay');
      // await handler.approve();
    }
  }, [actCardDataInf]);

  const borrow = useCallback(async (formData) => {
    await handler.borrow(formData.field, actCardDataInf.vault.vaultNum, setCollateralInf,
      setBorrowingInf, setLoadingInf);
  }, [actCardDataInf]);

  const repay = async (formData) => {
    if (repayBtnTitle === 'Approve') {
      await handler.approveSwitcher('repay');
      handler.allowanceSwitcher(setAllowanceRepay, 'repay');
      setRepayBtnTitle('Repay');
    } else {
      await handler.repay(formData.field, actCardDataInf.vault.vaultNum, setCollateralInf,
        setBorrowingInf, setLoadingInf);
    }
  };

  const addDeposit = async (formData) => {
    if (depositBtnTitle === 'Approve') {
      await handler.approveSwitcher('deposit');
      handler.allowanceSwitcher(setAllowanceDeposit, 'deposit');
      setDepositBtnTitle('Add');
    } else {
      await handler.addDeposit(formData.field, actCardDataInf.vault.vaultNum, setCollateralInf,
        setBorrowingInf, setLoadingInf);
    }
  };

  const withdraw = useCallback(async (formData) => {
    await handler.withdraw(formData.field, actCardDataInf.vault.vaultNum, setCollateralInf,
      setBorrowingInf, setLoadingInf);
  }, [actCardDataInf]);

  const onChangeValueBtnSlide = async (type, value) => {
    const inputValue = value.target.value;

    if (type === 'deposit') {
      if (Number(allowanceDeposit) < Number(inputValue)) {
        setDepositBtnTitle('Approve');
      } else {
        setDepositBtnTitle('Add');
      }
    } else if (type === 'repay') {
      if (Number(allowanceRepay) < Number(inputValue)) {
        setRepayBtnTitle('Approve');
      } else {
        setRepayBtnTitle('Repay');
      }
    }
  };

  const collateralInfArr = useMemo(() => {
    return [
      {
        label: 'Asset',
        value: collateralInf?.assets || '-'
      },
      {
        label: 'Locked collateral',
        value: fN(collateralInf?.lockedCol) || 0
      },
      {
        label: 'Asset price',
        value: fN(collateralInf?.assetPrice) || 0
      },
      {
        label: 'Available to deposit',
        value: fN(collateralInf?.availableDeposit) || 0
      },
      {
        label: 'Available to withdraw',
        value: fN(collateralInf?.availableWithdraw) || 0
      },
      {
        label: 'Liquidation Price',
        value: fN(collateralInf?.liquidationPrice) || 0
      },
    ];
  }, [collateralInf]);

  const borrowingInfArr = useMemo(() => {
    return [
      {
        label: 'Asset',
        value: borrowingInf?.assets || '-'
      },
      {
        label: 'Collateral value',
        value: fN(borrowingInf?.collateralValue) || 0
      },
      {
        label: 'Borrowing limit',
        value: fN(borrowingInf?.borrowingLimit) || 0
      },
      {
        label: 'Available to borrow',
        value: fN(borrowingInf?.availableBorrow) || 0
      },
      {
        label: 'Available to repay',
        value: fN(borrowingInf?.availableRepay) || 0
      },
      {
        label: 'Outstanding debt',
        value: fN(borrowingInf?.outstandingDebt) || 0
      },
      {
        label: 'Liquidation limit',
        value: fN(borrowingInf?.liquidationLimit) || 0
      },
      {
        label: 'Borrowing fee p. a.',
        value: (fN(borrowingInf?.borrowingFee) || 0) + '%'
      },
    ];
  }, [borrowingInf]);

  return (
    <Col xs={12}>
      <CardDetail>
        <p className="title-1">Borrow QUSD</p>
        {loadingInf ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
          <>
            <p className="title-2">Collateral</p>
            {ShowListElem(collateralInfArr)}
            <p className="title-2">Borrowing</p>
            {ShowListElem(borrowingInfArr)}
          </>
        }
        <div className="btn-group">
          <ButtonSlide
            btnTxt="Borrow asset"
            btnShortTxt="Borrow"
            onclick={borrow}
            inpType="text"
            inpPlaceholder={`Amount (${borrowingInf?.assets})`}
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Repay Borrowed Asset"
            btnShortTxt={repayBtnTitle}
            onclick={repay}
            inpType="text"
            inpPlaceholder={`Amount (${borrowingInf?.assets})`}
            inpRules={{ required: true }}
            onChange={(value) => {
              onChangeValueBtnSlide('repay', value);
            }}
          />
          <ButtonSlide
            btnTxt="Deposit collateral"
            btnShortTxt={depositBtnTitle}
            onclick={addDeposit}
            inpType="text"
            inpPlaceholder={`Amount (${collateralInf?.assets})`}
            inpRules={{ required: true }}
            onChange={(value) => {
              onChangeValueBtnSlide('deposit', value);
            }}
          />
          <ButtonSlide
            btnTxt="Withdraw Collateral"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="text"
            inpPlaceholder={`Amount (${collateralInf?.assets})`}
            inpRules={{ required: true }}
          />
        </div>
      </CardDetail>
    </Col>
  );
}

BorrowBlock.propTypes = {
  actCardData: PropTypes.object.isRequired,
};
