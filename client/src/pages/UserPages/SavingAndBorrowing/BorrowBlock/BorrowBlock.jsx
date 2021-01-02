import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import PropTypes from 'prop-types';
import { GovernedEpdrQbtcQusdOracle, GovernedEpdrQethQusdOracle } from 'contracts/FxPriceFeed';
import { web3 } from 'contracts/config/drizzle-config';
import { roundNumber } from 'func/useful';
import EPDRParameters from 'contracts/EPDRParameters';
import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress } from 'contracts/StableCoin';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { BorrowingCoreQUSD } from 'contracts/BorrowingCore';

import { CardDetail } from '../styles';

export default function BorrowBlock(props) {
  const { actCardData } = props;

  const [stableCoinContract, setStableCoinContract] = useState(undefined)

  const [exchangeRate, setExchangeRate] = useState(0)
  const [avToDeposit, setAvToDeposit] = useState(0)
  const [borLimit, setBorLimit] = useState(0)
  const [avToBorrow, setAvToBorrow] = useState(0)
  const [colValue, setColValue] = useState(0)
  const [liqLimit, setLiqLimit] = useState(0)

  const address = useSelector(userAddressMetamask);
  const borrowingContract = new BorrowingCoreQUSD();

  useEffect(async () => {
    if (actCardData.type !== 'borrow') return;

    // Setup contracts
    let oracleContractL, stableCoinContractL;
    if (actCardData.vault.colKey === 'QETH') oracleContractL = new GovernedEpdrQethQusdOracle();
    else if (actCardData.vault.colKey === 'QBTC') oracleContractL = new GovernedEpdrQbtcQusdOracle();
    if (actCardData.vault.colKey === 'QETH') stableCoinContractL = new GovernedEpdrQethAddress();
    else if (actCardData.vault.colKey === 'QBTC') stableCoinContractL = new GovernedEpdrQbtcAddress();

    setStableCoinContract(stableCoinContractL);

    // Setup exchange rate
    let exchangeRateL = await oracleContractL.exchangeRate().catch(() => {});
    exchangeRateL = roundNumber(web3.utils.fromWei(new web3.utils.BN(exchangeRateL)), 4);
    setExchangeRate(exchangeRateL);

    // Setup available to deposit limit
    let avToDepositL = await stableCoinContractL.balanceOf(address).catch(() => {});
    avToDepositL = avToDepositL === undefined ? 0 : avToDepositL;
    setAvToDeposit(avToDepositL);

    // Setup collateral value
    let colValueL = actCardData.vault.colAsset * exchangeRate;
    setColValue(colValueL)

    // Setup borrowing limit
    const parametersContract = new EPDRParameters();
    let colRatioClear = await  parametersContract.getUint(`governed.EPDR.${actCardData.collateral}_QUSD_collateralizationRatio`).catch(() => {});
    let colRatio = web3.utils.fromWei(new web3.utils.BN(colRatioClear))
    let borLimitL = avToDepositL/colRatio;
    setBorLimit(borLimitL);

    // Setup available to borrow
    setAvToBorrow(borLimitL - actCardData.vault.debtBalance)

    // Setup liquidation limit
    let liqRatioClear = await  parametersContract.getUint(`governed.EPDR.${actCardData.collateral}_QUSD_liquidationRatio`).catch(() => {});
    let liqLimitL = Number(liqRatioClear) !== 0 ? colRatioClear / liqRatioClear : 0;
    setLiqLimit(liqLimitL);

  }, [actCardData]);

  const borrow = (formData) => {
    borrowingContract.generateStc(address, actCardData.vault.vaultNum, formData.field).catch((e) => {console.log(e)})
  };
  const repay = (formData) => {
    borrowingContract.payBackSTC(address, actCardData.vault.vaultNum, formData.field).catch((e) => {console.log(e)})
  };
  const addDeposit = async (formData) => {
    borrowingContract.depositCol(address, actCardData.vault.vaultNum, formData.field).catch((e) => {console.log(e)})
    // let approve = await  stableCoinContract.approve(address, formData.field);
    // if (approve.status === true) {
    //   borrowingContract.depositCol(address, actCardData.vault.vaultNum, formData.field)
    // }
  };

  const withdraw = (formData) => {
    console.log('withdraw', formData);
    borrowingContract.withdrawCol(address, actCardData.vault.vaultNum, formData.field).catch((e) => {console.log(e)})
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
          <span>{actCardData.vault?.colAsset}</span>
        </div>
        <div className="txt">
          <span>Asset price</span>
          <span>{exchangeRate}</span>
        </div>
        <div className="txt">
          <span>Available to deposit</span>
          <span>{avToDeposit ? avToDeposit : 0}</span>
        </div>
        <div className="txt">
          <span>Available to withdraw</span>
          <span>-</span>
        </div>
        <div className="txt">
          <span>Liquidation Price</span>
          <span>-</span>
        </div>

        <p className="title-2">Borrowing</p>
        <div className="txt">
          <span>Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Collateral value</span>
          <span>{colValue}</span>
        </div>
        <div className="txt">
          <span>Borrowing limit</span>
          <span>{borLimit}</span>
        </div>
        <div className="txt">
          <span>Available to borrow</span>
          <span>{avToBorrow}</span>
        </div>
        <div className="txt">
          <span>Outstanding debt</span>
          <span>{actCardData.vault?.debtBalance}</span>
        </div>
        <div className="txt">
          <span>Liquidation limit</span>
          <span>{liqLimit}</span>
        </div>
        <div className="txt">
          <span>Borrowing fee p. a.</span>
          <span>{actCardData.vault?.borrowingFee === undefined ? '-' : `${actCardData.vault.borrowingFee}%`}</span>
        </div>

        <div className="btn-group">
          <ButtonSlide
            btnTxt="Borrow asset"
            btnShortTxt="Borrow"
            onclick={borrow}
            inpType="number"
            inpPlaceholder="Amount (Q)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Repay Borrowed Asset"
            btnShortTxt="Repay"
            onclick={repay}
            inpType="number"
            inpPlaceholder="Amount (Q)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Deposit collateral"
            btnShortTxt="Add"
            onclick={addDeposit}
            inpType="number"
            inpPlaceholder="Amount (Q)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Withdraw Collateral"
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

BorrowBlock.propTypes = {
  actCardData: PropTypes.object.isRequired,
};
