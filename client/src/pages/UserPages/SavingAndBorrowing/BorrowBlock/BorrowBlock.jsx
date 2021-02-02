import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { fromBtcBlockchain } from 'func/balance';
import { fN } from 'func/useful';
import CommonHandler from '../handler';
import Handler from './handler';
import { CardDetail } from '../styles';
import { drizzleRegistry } from '../../../../contracts/config/drizzle-config';

export default function BorrowBlock(props) {
  const { actCardData } = props;

  const [lockedCol, setLockedCol] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [avToWithdraw, setAvToWithdraw] = useState(0);
  const [avToDeposit, setAvToDeposit] = useState(0);
  const [borLimit, setBorLimit] = useState(0);
  const [avToBorrow, setAvToBorrow] = useState(0);
  const [colValue, setColValue] = useState(0);
  const [liqLimit, setLiqLimit] = useState(0);
  const [liqPrice, setLiqPrice] = useState(0);

  const [colRatio, setColRatio] = useState(0);
  const [liqRatio, setLiqRatio] = useState(0);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, actCardData?.vault?.colKey, useDispatch());
  const commonHandler = new CommonHandler(address, useDispatch());

  useEffect(async () => {
    if (actCardData.type !== 'borrow') return;

    commonHandler.setExchangeRate(actCardData.vault.colKey, setExchangeRate);
    handler.setAvailableToDeposit(setAvToDeposit);
    handler.setCollateralRatio(actCardData.collateral, setColRatio);
    handler.setLiquidationRatio(actCardData.collateral, setLiqRatio);
  }, [actCardData]);

  useEffect(() => {
    if (actCardData.type !== 'borrow') return;

    // Setup locked collateral
    let lockedColL = lockedCol;
    if (actCardData?.vault?.colKey === 'QETH') {
      lockedColL = actCardData.vault.colAsset;
    } else if (actCardData?.vault?.colKey === 'QBTC') {
      lockedColL = fromBtcBlockchain(actCardData.vault.colAsset);
    }
    setLockedCol(lockedColL);

    // Setup collateral value
    const colValueL = lockedColL * exchangeRate;
    setColValue(colValueL);
    const debtBalance = drizzleRegistry.web3.utils.fromWei(actCardData.vault.debtBalance, 'ether');
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
      console.log("colValueL", colValueL);
      console.log("colRatio", colRatio);
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
  });

  const borrow = (formData) => {
    handler.borrow(formData.field, actCardData.vault.vaultNum);
  };
  const repay = (formData) => {
    handler.repay(formData.field, actCardData.vault.vaultNum);
  };
  const addDeposit = async (formData) => {
    handler.addDeposit(formData.field, actCardData.vault.vaultNum, lockedCol, setLockedCol, setAvToDeposit);
  };
  const withdraw = (formData) => {
    handler.withdraw(formData.field, actCardData.vault.vaultNum, lockedCol, setLockedCol, setAvToDeposit);
  };

  return (
    <Col xs={12}>
      <CardDetail>
        <p className="title-1">Borrow QUSD</p>
        <p className="title-2">Collateral</p>
        <div className="txt">
          <span>Asset</span>
          <span>{actCardData.vault?.colKey}</span>
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
          <span>Outstanding debt</span>
          <span>{
            actCardData.vault?.debtBalance ?
              fN(drizzleRegistry.web3.utils.fromWei(actCardData.vault.debtBalance, 'ether')) :
              null
          }</span>
        </div>
        <div className="txt">
          <span>Liquidation limit</span>
          <span>{fN(liqLimit)}</span>
        </div>
        <div className="txt">
          <span>Borrowing fee p. a.</span>
          <span>{actCardData.vault?.borrowingFee === undefined ? '-' : `${fN(actCardData.vault.borrowingFee)}%`}</span>
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
            btnShortTxt="Repay"
            onclick={repay}
            inpType="number"
            inpPlaceholder="Amount (QUSD)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Deposit collateral"
            btnShortTxt="Add"
            onclick={addDeposit}
            inpType="number"
            inpPlaceholder={`Amount (${actCardData?.vault?.colKey})`}
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Withdraw Collateral"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="number"
            inpPlaceholder={`Amount (${actCardData?.vault?.colKey})`}
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
