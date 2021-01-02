import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { BorrowingCoreQUSD } from 'contracts/BorrowingCore';
import EPDRParameters from 'contracts/EPDRParameters';
import { uintPerSecondToPerYearNumber } from 'func/useful';
import BlockCardItem from '../BlockCardItem';

import { BlockCard } from '../styles';

export default function BorrowCard(props) {
  const { setActCardData } = props;
  const [vaultsCount, setVaultsCount] = useState(0);
  const [vaults, setVaults] = useState([]);

  const contract = new BorrowingCoreQUSD();
  const address = useSelector(userAddressMetamask);

  // Get vault count for address
  useEffect(async () => {
    const data = await contract.userVaultsCount(address).catch(() => {});
    setVaultsCount(data);
  }, []);

  // Get vaults for address by count
  useEffect(async () => {
    const contractEPDR = new EPDRParameters();
    const vaultsLoc = [];
    for (let i = 0; i < vaultsCount; i += 1) {
      const vaultInfo = await contract.userVaults(address, i).catch(() => {});
      let fee = await contractEPDR.getUint(`governed.EPDR.${vaultInfo.colKey}_QUSD_interestRate`).catch(() => {});
      fee = uintPerSecondToPerYearNumber(fee);
      vaultInfo.borrowingFee = fee;
      vaultInfo.vaultNum = i;
      vaultsLoc.push(vaultInfo);
    }
    setVaults(vaultsLoc);
  }, [vaultsCount]);

  function renderVaults() {
    return vaults.map((vault, key) => (
      <BlockCardItem
        key={key}
        txt1="Collateral Asset"
        val1={vault.colKey}
        txt2="Borrowing Asset"
        val2="QUSD"
        txt3="Borrowing Fee (p.a.)"
        val3={vault.borrowingFee}
        setActCardData={setActCardData}
        vault={vault}
      />
    ));
  }

  return (
    <Col xs={12}>
      <BlockCard className="card-item-container borrow">
        <p>Borrow Crypto Assets</p>
        {renderVaults()}
      </BlockCard>
    </Col>
  );
}

BorrowCard.propTypes = {
  setActCardData: PropTypes.func.isRequired,
};
