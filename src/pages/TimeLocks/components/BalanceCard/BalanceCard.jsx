import { useState } from 'react';

import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Table from 'ui/Table';

import CustomBlock from 'components/Base/CustomBlock';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import ManageForm from '../ManageForm';
import VestingWithdrawForm from '../VestingWithdrawForm';

import { BalanceCardContent } from './styles';

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

      <Modal
        open={isModalShown}
        title={contract === 'vesting' ? 'Deposit, withdraw & purge' : 'Deposit & purge'}
        width={480}
        onClose={() => setIsModalShown(false)}
      >
        <BalanceCardContent>
          <div>
            <p className="text-md font-light">Recipient Address</p>
            <div className="text-md">
              <ExplorerAddress address={address} />
            </div>
          </div>
          {contract === 'vesting' && <VestingWithdrawForm />}
          <ManageForm contract={contract} address={address} />
        </BalanceCardContent>
      </Modal>

      <div className="button__bottom">
        <Button onClick={() => setIsModalShown(true)}>Manage</Button>
      </div>
    </CustomBlock>
  );
}

export default BalanceCard;
