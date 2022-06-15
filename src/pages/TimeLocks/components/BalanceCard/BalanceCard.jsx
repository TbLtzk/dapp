import { useState } from 'react';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import ModalWindow from 'components/Base/ModalWindow';
import MemberTables from 'components/Custom/MemberTables';

import ManageForm from '../ManageForm';
import VestingWithdrawForm from '../VestingWithdrawForm';

import { columnnsLockAmount } from 'constants/columns';
import { tableLockAmount } from 'constants/tables';

function BalanceCard ({ title, contract, balanceRef, lockAmountData, timeLockBalanceRef, address }) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <CustomBlock>
      <h5>{title}</h5>
      <p ref={balanceRef}>0 Q</p>

      <h5>Time Locked Balance</h5>
      <p ref={timeLockBalanceRef}>0 Q</p>

      <MemberTables
        perPageLength={4}
        emptyTableMessage="No Time Locks"
        table={tableLockAmount(lockAmountData)}
        columns={columnnsLockAmount}
      />

      <ModalWindow
        scrollable={false}
        show={isModalShown}
        modalTitle={contract === 'vesting' ? 'Deposit, withdraw & purge' : 'Deposit & purge'}
        content={
          <>
            <div className="modal-line" />
            <h5>Recipient Address</h5>
            <h4>{address}</h4>
            {contract === 'vesting' && <VestingWithdrawForm />}
            <ManageForm contract={contract} address={address} />
          </>
        }
        onHide={() => setIsModalShown(false)}
      />

      <div className="button__bottom">
        <Button style={{ width: '80px' }} onClick={() => setIsModalShown(true)}>
          Manage
        </Button>
      </div>
      <div style={{ height: '30px' }} />
    </CustomBlock>
  );
}

export default BalanceCard;
