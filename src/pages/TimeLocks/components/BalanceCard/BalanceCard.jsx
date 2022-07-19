import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <CustomBlock>
      <h5>{title}</h5>
      <p ref={balanceRef}>0 Q</p>

      <h5>{t('TIME_LOCKED_BALANCE')}</h5>
      <p ref={timeLockBalanceRef}>0 Q</p>

      <Table
        tiny
        perPage={4}
        emptyTableMessage={t('NO_TIME_LOCKS')}
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
            text: t('AMOUNT'),
          },
          {
            dataField: 'releaseStart',
            text: t('START_DATE'),
          },
          {
            dataField: 'releaseEnd',
            text: t('END_DATE'),
          },
        ]}
      />

      <Modal
        open={isModalShown}
        title={contract === 'vesting' ? t('DEPOSIT_WITHDRAW_PURGE') : t('DEPOSIT_PURGE')}
        width={480}
        onClose={() => setIsModalShown(false)}
      >
        <BalanceCardContent>
          <div>
            <p className="text-md font-light"> {t('RECIPIENT_ADDRESS')}</p>
            <div className="text-md">
              <ExplorerAddress address={address} />
            </div>
          </div>
          {contract === 'vesting' && <VestingWithdrawForm />}
          <ManageForm contract={contract} address={address} />
        </BalanceCardContent>
      </Modal>

      <div className="button__bottom">
        <Button onClick={() => setIsModalShown(true)}>{t('MANAGE')}</Button>
      </div>
    </CustomBlock>
  );
}

export default BalanceCard;
