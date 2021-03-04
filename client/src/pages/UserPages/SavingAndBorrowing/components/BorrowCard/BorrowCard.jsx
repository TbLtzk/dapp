import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';
import { userAddressMetamask } from 'store/selectors/user-inf';

import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';

import BlockCardItem from '../../BlockCardItem';

import { uintPerSecondToPerYearNumber } from 'func/useful';

import { Col } from 'react-bootstrap';
import { BlockCard } from '../../styles';

export default function BorrowCard(props) {
  const { setActCardData } = props;
  const [vaultsCount, setVaultsCount] = useState(0);
  const [vaults, setVaults] = useState([]);

  const contract = new BorrowingCoreQUSD();
  const address = useSelector(userAddressMetamask);
  const dispatch = useDispatch();

  // Get vault count for address
  useEffect(async () => {
    const data = await contract.userVaultsCount(address)
      .catch(() => {
      });
    setVaultsCount(data);
  }, []);

  // Get vaults for address by count
  useEffect(async () => {

    //TODO: Change logic using borrowingContract.getVaultStats function twice
    const borrowingContract = new BorrowingCoreQUSD();
    const vaultsLoc = [];
    for (let i = 0; i < vaultsCount; i += 1) {
      const vaultInfo = await contract.userVaults(address, i)
        .catch(() => {
        });
      let vaultStats = await borrowingContract.getVaultStats(address, i)
        .catch(() => {
        });
      let fee = vaultStats?.stcStats?.borrowingFee ? uintPerSecondToPerYearNumber(vaultStats?.stcStats?.borrowingFee) : 0;
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

  function render() {
    if (vaults.length > 0) {
      return (
        <Col xs={12}>
          <BlockCard className="card-item-container borrow">
            <p>Borrow Crypto Assets</p>
            {renderVaults()}
          </BlockCard>
        </Col>
      );
    }
    return '';
  }

  return render();
}

BorrowCard.propTypes = {
  setActCardData: PropTypes.func.isRequired,
};
