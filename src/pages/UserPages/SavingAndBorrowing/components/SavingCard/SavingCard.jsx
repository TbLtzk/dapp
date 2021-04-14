import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlockCardItem from 'pages/UserPages/SavingAndBorrowing/BlockCardItem';

import { SavingQUSD } from 'contracts/src/Saving';

import { uintPerSecondToPerYearNumber } from 'func/useful';

import { Col } from 'react-bootstrap';
import { BlockCard } from 'pages/UserPages/SavingAndBorrowing/styles';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

export default function SavingCard(props) {
  const { setActCardData } = props;

  const [intRate, setIntRate] = useState(0);
  const myAddress = useSelector(userAddressMetamask);

  useEffect(async () => {
    const contractSavingQUSD = new SavingQUSD(contractsToAddresses['SavingQUSD']);
    const BalanceDetails = await contractSavingQUSD.getBalanceDetails(myAddress)
      .catch(() => {
      });
    const intRateL = uintPerSecondToPerYearNumber(BalanceDetails.interestRate);
    setIntRate(intRateL);
  }, []);

  return (
    <Col xs={12}>
      <BlockCard className="card-item-container">
        <p>Saving Crypto Assets</p>
        <BlockCardItem
          txt1="Deposit Asset"
          val1="QUSD"
          txt2="Interest Asset"
          val2="QUSD"
          txt3="Interest Rate (p.a.)"
          val3={intRate}
          setActCardData={setActCardData}
        />
      </BlockCard>
    </Col>
  );
}

SavingCard.propTypes = {
  setActCardData: PropTypes.func.isRequired,
};
