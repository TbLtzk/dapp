import { useState } from 'react';

import Button from 'ui/Button';
import Table from 'ui/Table';

import CustomBlock from 'components/Base/CustomBlock';
import ModalWindow from 'components/Base/ModalWindow';

import ManageForm from '../ManageForm';
import VestingWithdrawForm from '../VestingWithdrawForm';

import { fromWei } from 'func/balance';
import { convertToMonthDayYear } from 'func/convertDate';

function BalanceCard ({ title, contract, balanceRef, lockAmountData, timeLockBalanceRef, address }) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <CustomBlock>
      <h5>{title}</h5>
      <p ref={balanceRef}>0 Q</p>

      <h5>Time Locked Balance</h5>
      <p ref={timeLockBalanceRef}>0 Q</p>

      <Table
        tiny
        perPage={4}
        emptyTableMessage="No Time Locks"
        table={lockAmountData.map((lock) => ({
          id: lock.id,
          amount: fromWei(lock.amount) + ' Q',
          releaseStart: convertToMonthDayYear(lock.releaseStart),
          releaseEnd: convertToMonthDayYear(lock.releaseEnd),
        }))}
        columns={[
          {
            dataField: 'id',
            text: '#',
          },
          {
            dataField: 'amount',
            text: 'Amount',
          },
          {
            dataField: 'releaseStart',
            text: 'Start Date',
          },
          {
            dataField: 'releaseEnd',
            text: 'End Date',
          },
        ]}
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
        <Button onClick={() => setIsModalShown(true)}>Manage</Button>
      </div>
    </CustomBlock>
  );
}

export default BalanceCard;
