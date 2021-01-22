import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { fromBtcBlockchain } from 'func/balance';
import { fN } from 'func/useful';
import CommonHandler from '../handler';

import { BlockInfo } from './styles';

export default function InfoBlocks() {
  const [availableToDeposit, setAvailableToDeposit] = useState(0);
  const [vaults, setVaults] = useState([]);
  const [exchangeRateQBTC, setExchangeRateQBTC] = useState(0);
  const [totalColVal, setTotalColVal] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  const address = useSelector(userAddressMetamask);
  // const contHandler = new ContractHandler(address, useDispatch());
  const commonHandler = new CommonHandler(address, useDispatch());

  useEffect(() => {
    commonHandler.setAvailableToDeposit(setAvailableToDeposit);
    commonHandler.setVaults(setVaults);
    commonHandler.setExchangeRate('QBTC', setExchangeRateQBTC);
  }, []);

  const calculateTotalColVal = () => {
    let colValTotal = 0;
    if (vaults.length > 0) {
      vaults.forEach((vault) => {
        const lockedCol = fromBtcBlockchain(vault.colAsset);
        const colVal = lockedCol * exchangeRateQBTC;
        colValTotal += colVal;
      });
      setTotalColVal(colValTotal);
    }
  };

  const calculateTotalDebt = () => {
    let totalDebtL = 0;
    if (vaults.length > 0) {
      vaults.forEach((vault) => {
        const totalDebtVault = vault.debtBalance;
        totalDebtL += totalDebtVault;
      });
      setTotalDebt(totalDebtL);
    }
  };

  useEffect(() => {
    calculateTotalColVal();
    calculateTotalDebt();
  });

  // console.log(vaults);
  // console.log(exchangeRateQBTC);

  return (
    <>
      <Col xs={4}>
        <BlockInfo xs={3}>
          <p className="info">
            Total
            <br />
            Saving balance
          </p>
          <p className="value">
            {fN(availableToDeposit)}
            {' '}
            QUSD
          </p>
        </BlockInfo>
      </Col>
      <Col xs={4}>
        <BlockInfo xs={3}>
          <p className="info">
            Outstanding
            <br />
            Debt
          </p>
          <p className="value">
            {fN(totalDebt)}
            {' '}
            USD
          </p>
        </BlockInfo>
      </Col>
      <Col xs={4}>
        <BlockInfo xs={3}>
          <p className="info">
            Total
            <br />
            Collateral locked
          </p>
          <p className="value">
            {fN(totalColVal)}
            {' '}
            USD
          </p>
        </BlockInfo>
      </Col>
    </>
  );
}
