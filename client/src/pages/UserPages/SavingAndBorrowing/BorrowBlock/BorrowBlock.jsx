import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { fromBtcBlockchain } from 'func/balance';
import { fN, uintPerSecondToPerYearNumber } from 'func/useful';
import CommonHandler from '../handler';
import Handler from './handler';
import { CardDetail } from '../styles';
import { drizzleRegistry, web3 } from 'contracts/config/drizzle-config';
import { BN, fromWei } from 'func/balance';

export default function BorrowBlock(props) {
  const { actCardData } = props;
  console.log('actCardData', actCardData);

  const [actCardDataInf, setActCardDataInf] = useState(actCardData);

  useEffect(() => {
    setActCardDataInf(actCardData);
  }, [actCardData]);

  const [lockedCol, setLockedCol] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [avToWithdraw, setAvToWithdraw] = useState(0);
  const [avToDeposit, setAvToDeposit] = useState(0);
  const [borLimit, setBorLimit] = useState(0);
  const [avToBorrow, setAvToBorrow] = useState(0);
  const [avToRepay, setAvToRepay] = useState(0);
  const [colValue, setColValue] = useState(0);
  const [liqLimit, setLiqLimit] = useState(0);
  const [liqPrice, setLiqPrice] = useState(0);

  const [colRatio, setColRatio] = useState(0);
  const [liqRatio, setLiqRatio] = useState(0);

  const [repayBtnTitle, setRepayBtnTitle] = useState('Repay');
  const [depositBtnTitle, setDepositBtnTitle] = useState('Add');
  const [allowance, setAllowance] = useState(0);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, actCardDataInf?.vault?.colKey, useDispatch());
  const commonHandler = new CommonHandler(address, useDispatch());

  useEffect(async () => {
    if (actCardDataInf.type !== 'borrow') return;

    commonHandler.setExchangeRate(actCardDataInf.vault.colKey, setExchangeRate);
    handler.setAvailableToDeposit(setAvToDeposit);
    handler.setCollateralRatio(actCardDataInf.collateral, setColRatio);
    handler.setLiquidationRatio(actCardDataInf.collateral, setLiqRatio);
    handler.allowance(setAllowance);
    // await handler.approve();
    if (actCardDataInf?.collateral === 'QBTC') {
      handler.setAvailableToRepay(setAvToRepay);
    }
  }, [actCardDataInf]);

  useEffect(() => {
    if (actCardDataInf.type !== 'borrow') return;

    // Setup locked collateral
    let lockedColL = lockedCol;
    if (actCardDataInf?.vault?.colKey === 'QETH') {
      lockedColL = actCardDataInf.vault.colAsset;
    } else if (actCardDataInf?.vault?.colKey === 'QBTC') {
      lockedColL = fromBtcBlockchain(actCardDataInf.vault.colAsset);
    }
    setLockedCol(lockedColL);

    // Setup collateral value
    const colValueL = lockedColL * exchangeRate;
    setColValue(colValueL);
    const debtBalance = drizzleRegistry.web3.utils.fromWei(actCardDataInf.vault.debtBalance, 'ether');
    // Setup available to borrow
    const avToBorrowL = borLimit - debtBalance;
    setAvToBorrow(avToBorrowL);

    // Setup liquidation price
    if (colRatio !== 0 && Number(lockedColL) !== 0) {
      const liqPriceL = (debtBalance * liqRatio) / lockedColL;
      setLiqPrice(liqPriceL);
    }

    // Setup borrow limit
    if (colRatio !== 0) {
      const borLimitL = colValueL / colRatio;
      setBorLimit(borLimitL);
    }

    // Setup liquidation limit
    if (liqRatio !== 0) {
      const liqLimitL = colValueL / liqRatio;
      setLiqLimit(liqLimitL);
    }

    // Setup liquidation limit
    if (exchangeRate !== 0) {
      const avToWithdrawL = (avToBorrow / exchangeRate) * colRatio;
      setAvToWithdraw(avToWithdrawL);
    }
  },[actCardDataInf, exchangeRate, liqRatio, colRatio, borLimit, lockedCol, avToBorrow]);

  const borrow = async(formData) => {
    await handler.borrow(formData.field, actCardDataInf.vault.vaultNum, actCardDataInf, setActCardDataInf);
  };

  const repay = async (formData) => {
    if (repayBtnTitle === 'Approve') {
      await handler.approve();
      handler.allowance(setAllowance);
      setRepayBtnTitle('Repay');
    } else {
      await handler.repay(formData.field, actCardDataInf.vault.vaultNum, actCardDataInf, setActCardDataInf);
    }

  };
  const addDeposit = async (formData) => {
    if (depositBtnTitle === 'Approve') {
      await handler.approve();
      handler.allowance(setAllowance);
      setDepositBtnTitle('Add');
    } else {
      await handler.addDeposit(formData.field, actCardDataInf.vault.vaultNum, lockedCol, setLockedCol, setAvToDeposit,
        actCardDataInf, setActCardDataInf);
    }
  };
  const withdraw = async (formData) => {
    await handler.withdraw(formData.field, actCardDataInf.vault.vaultNum, lockedCol, setLockedCol, setAvToDeposit,
      actCardDataInf, setActCardDataInf);
  };

  // let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.SystemSurplusAuction);
  const onChangeValueBtnSlide = async (type, value) => {
    const inputValue = value.target.value;
    if (allowance === '0' || inputValue === allowance) {
      if (type === 'deposit') {
        setDepositBtnTitle('Approve');
      } else if (type === 'repay') {
        setRepayBtnTitle('Approve');
      }
    } else {
      if (type === 'deposit') {
        setDepositBtnTitle('Add');
      } else if (type === 'repay') {
        setRepayBtnTitle('Repay');
      }
    }
    console.log('allowance', allowance);
  };

  return (
    <Col xs={12}>
      <CardDetail>
        <p className="title-1">Borrow QUSD</p>
        <p className="title-2">Collateral</p>
        <div className="txt">
          <span>Asset</span>
          <span>{actCardDataInf.vault?.colKey}</span>
        </div>
        <div className="txt">
          <span>Locked collateral</span>
          <span>{fN(lockedCol)}</span>
        </div>
        <div className="txt">
          <span>Asset price</span>
          <span>{fN(exchangeRate)}</span>
        </div>
        <div className="txt">
          <span>Available to deposit</span>
          <span>{fN(avToDeposit) || 0}</span>
        </div>
        <div className="txt">
          <span>Available to withdraw</span>
          <span>{fN(avToWithdraw)}</span>
        </div>
        <div className="txt">
          <span>Liquidation Price</span>
          <span>{fN(liqPrice)}</span>
        </div>

        <p className="title-2">Borrowing</p>
        <div className="txt">
          <span>Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Collateral value</span>
          <span>{fN(colValue)}</span>
        </div>
        <div className="txt">
          <span>Borrowing limit</span>
          <span>{fN(borLimit)}</span>
        </div>
        <div className="txt">
          <span>Available to borrow</span>
          <span>{fN(avToBorrow)}</span>
        </div>
        <div className="txt">
          <span>Available to repay</span>
          <span>{fN(avToRepay)}</span>
        </div>
        <div className="txt">
          <span>Outstanding debt</span>
          <span>{
            actCardDataInf.vault?.debtBalance ?
              fN(drizzleRegistry.web3.utils.fromWei(actCardDataInf.vault.debtBalance, 'ether')) :
              null
          }</span>
        </div>
        <div className="txt">
          <span>Liquidation limit</span>
          <span>{fN(liqLimit)}</span>
        </div>
        <div className="txt">
          <span>Borrowing fee p. a.</span>
          <span>{actCardDataInf.vault?.borrowingFee === undefined ? '-' : `${fN(actCardDataInf.vault.borrowingFee)}%`}</span>
        </div>

        <div className="btn-group">
          <ButtonSlide
            btnTxt="Borrow asset"
            btnShortTxt="Borrow"
            onclick={borrow}
            inpType="number"
            inpPlaceholder="Amount (QUSD)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Repay Borrowed Asset"
            btnShortTxt={repayBtnTitle}
            onclick={repay}
            inpType="number"
            inpPlaceholder="Amount (QUSD)"
            inpRules={{ required: true }}
            onChange={(value) => {
              onChangeValueBtnSlide('repay', value);
            }}
          />
          <ButtonSlide
            btnTxt="Deposit collateral"
            btnShortTxt={depositBtnTitle}
            onclick={addDeposit}
            inpType="number"
            inpPlaceholder={`Amount (${actCardDataInf?.vault?.colKey})`}
            inpRules={{ required: true }}
            onChange={(value) => {
              onChangeValueBtnSlide('deposit', value);
            }}
          />
          <ButtonSlide
            btnTxt="Withdraw Collateral"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="number"
            inpPlaceholder={`Amount (${actCardDataInf?.vault?.colKey})`}
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
