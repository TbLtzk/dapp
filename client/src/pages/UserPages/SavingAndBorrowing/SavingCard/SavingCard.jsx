import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BlockCard } from '../styles';
import BlockCardItem from '../BlockCardItem';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import { uintPerSecondToPerYearNumber } from '../../../../func/useful';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

export default function SavingCard(props) {
  const { setActCardData } = props;

  const [intRate, setIntRate] = useState(0);

  useEffect(async () => {
    const parametersContract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    let intRateL = await parametersContract.getUint('governed.EPDR.QUSD_savingRate').catch(() => {});
    intRateL = uintPerSecondToPerYearNumber(intRateL);
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
