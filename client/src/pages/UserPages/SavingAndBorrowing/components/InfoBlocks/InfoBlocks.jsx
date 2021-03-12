import React, { useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import { fN } from 'func/useful';
import CommonHandler from '../../handler';

import { Col } from 'react-bootstrap';
import { BlockInfo } from './styles';

export default function InfoBlocks() {
  const [totalDebt, setTotalDebt] = useState(0);
  const [loadingTotalDebt, setLoadingTotalDebt] = useState(true);
  const [totalColVal, setTotalColVal] = useState(0);
  const [loadingTotalColVal, setLoadingTotalColVal] = useState(true);
  const [totalSavingBalance, setTotalSavingBalance] = useState(0);
  const [loadingTotalSavingBalance, setLoadingTotalSavingBalance] = useState(false);

  const address = useSelector(userAddressMetamask);
  const commonHandler = new CommonHandler(address);

  useEffect(async () => {
    commonHandler.setTotalSavingBalance(setTotalSavingBalance, setLoadingTotalDebt);
    commonHandler.setOutstandingDebt(setTotalDebt, setLoadingTotalColVal);
    await commonHandler.setTotalCollateralLocked(setTotalColVal, setLoadingTotalSavingBalance);
  }, []);

  const infArr = useMemo(() => {
    return [
      {
        label: 'Total Saving balance',
        value: !loadingTotalDebt ? <span>{fN(totalSavingBalance) + ' QUSD'}</span> : <LoadingSpinner/>
      },
      {
        label: 'Outstanding Debt',
        value: !loadingTotalColVal ? <span>{fN(totalDebt) + ' USD'}</span> : <LoadingSpinner/>
      },
      {
        label: 'Total Collateral locked',
        value: !loadingTotalSavingBalance ? <span>{fN(totalColVal) + ' USD'}</span> : <LoadingSpinner/>
      },
    ];
  }, [totalSavingBalance, totalDebt, totalColVal,
    loadingTotalDebt, loadingTotalColVal, loadingTotalSavingBalance]);

  return (
    <>
      {infArr?.map(el => {
        return (
          <Col xs={4} key={el.label + 'main'}>
            <BlockInfo xs={3}>
              <p className="info">
                {el.label}
              </p>
              <div className="value">
                {el.value}
              </div>
            </BlockInfo>
          </Col>
        );
      })}
    </>
  );
}
