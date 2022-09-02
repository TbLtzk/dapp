import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { TimeLockContractType } from 'typings/contracts';
import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Table from 'ui/Table';

import ManageForm from '../DepositForm';
import VestingWithdrawForm from '../VestingWithdrawForm';

import { BalanceValueWrap, ContentWrap, TimeLocksTableContent } from './styles';

import { useLockedAmount } from 'store/locked-amount/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { CONTRACT_TYPES } from 'constants/contracts';
import { formatDate, unixToDate } from 'utils/date';

interface Props {
  title: string;
  contract: TimeLockContractType;
  balanceRef: RefObject<HTMLDivElement>;
  lockAmountData: TimeLockEntry[];
  timeLockBalanceRef: RefObject<HTMLDivElement>;
  address: string;
}

function TimeLocksTable ({
  title,
  contract,
  balanceRef,
  lockAmountData,
  timeLockBalanceRef,
  address
}: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { purgeTimeLocks } = useLockedAmount();

  function onSetPurgeTimeLocksAmount () {
    submitTransaction({
      successMessage: t('PURGE_EXPIRED_TIME_LOCKS_SUCCESS'),
      submitFn: () => purgeTimeLocks({ address, contractType: contract })
    });
  }

  return (
    <ContentWrap>
      <div className="block" style={{ flex: '1 340px' }}>
        <BalanceValueWrap>
          <p className="text-md color-secondary">{title}</p>
          <p ref={balanceRef} className="text-xl font-semibold">0 Q</p>
        </BalanceValueWrap>

        <BalanceValueWrap>
          <p className="text-md color-secondary">{t('TIME_LOCKED_BALANCE')}</p>
          <p ref={timeLockBalanceRef} className="text-xl font-semibold">0 Q</p>
        </BalanceValueWrap>

        {!!lockAmountData.length &&
          <Button
            look="secondary"
            style={{ width: '100%', marginBottom: '24px' }}
            onClick={onSetPurgeTimeLocksAmount}
          >
            {t('PURGE_EXPIRED_TIME_LOCKS')}
          </Button>
        }

        <Table
          tiny
          perPage={4}
          emptyTableMessage={t('NO_TIME_LOCKS')}
          table={lockAmountData.map((lock, i) => ({
            id: i + 1,
            amount: fromWei(lock.amount) + ' Q',
            releaseStart: formatDate(unixToDate(lock.releaseStart.toString())),
            releaseEnd: formatDate(unixToDate(lock.releaseEnd.toString())),
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
      </div>
      <div style={{ flex: '1 340px' }}>
        <div className="block">
          <TimeLocksTableContent>
            <ManageForm contract={contract} address={address} />
          </TimeLocksTableContent>
        </div>

        {contract === CONTRACT_TYPES.vesting &&
          <div className="block" style={{ flex: '1 343px', marginTop: '20px' }}>
            <VestingWithdrawForm />
          </div>}
      </div>
    </ContentWrap>
  );
}

export default TimeLocksTable;
