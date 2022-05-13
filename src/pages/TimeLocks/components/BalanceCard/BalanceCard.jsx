import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import ModalManage from './ModalManage';

import { setDepositLockedAmount, setPurgeTimeLocksAmount } from 'store/locked-amount/action-creators';

import { columnnsLockAmount } from 'constants/columns';
import { tableLockAmount } from 'constants/tables';

function BalanceCard ({ balance, title, lockAmountData, timeLockBalance, contract, address }) {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const setDeposit = (data) => {
    dispatch(setDepositLockedAmount({ contract, ...data, address }));
  };

  const setPurge = () => {
    dispatch(setPurgeTimeLocksAmount({ contract, address }));
  };

  return (
    <CustomBlock>
      <h5>{title}</h5>
      <p>{balance + ' Q'}</p>
      <h5>Time Locked Balance</h5>
      <p>{timeLockBalance} Q</p>
      <MemberTables
        perPageLength={4}
        emptyTableMessage="No Time Locks"
        table={tableLockAmount(lockAmountData)}
        columns={columnnsLockAmount}
      />
      <ModalManage
        address={address}
        modalTitle={contract === 'vesting' ? 'Deposit, withdraw & purge' : 'Deposit & purge'}
        contract={contract}
        setPurge={setPurge}
        setDeposit={setDeposit}
        modalShow={modalShow}
        setModalShow={(value) => setModalShow(value)}
      />
      <div className="button__bottom">
        <Button
          style={{ width: '80px' }}
          onClick={() => setModalShow(true)}
        >
          Manage
        </Button>
      </div>
      <div style={{ height: '30px' }} />
    </CustomBlock>
  );
}

export default BalanceCard;
