import { useTranslation } from 'react-i18next';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import styled from 'styled-components';
import { TimeLockContractType } from 'typings/contracts';
import { fromWei } from 'web3-utils';

import Button from 'components/Button';
import Table from 'components/Table';

import { useLockedAmount } from 'store/locked-amount/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { TimeLockStatus } from 'constants/statuses';
import { compareDates, formatDate, unixToDate } from 'utils/date';

const StyledWrapper = styled.div`
  margin-top: 24px;
`;

const StatusMark = styled.span<{ status: TimeLockStatus }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${({ status, theme }) => {
    if (status === TimeLockStatus.active) return theme.colors.success;
    if (status === TimeLockStatus.pending) return theme.colors.warning;
    return theme.colors.error;
  }};
`;

interface Props {
  contract: TimeLockContractType;
  lockAmountData: TimeLockEntry[];
  address: string;
}

function TimeLocksTable ({
  contract,
  lockAmountData,
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

  function getLockStatus (lock: TimeLockEntry): TimeLockStatus {
    const startDate = unixToDate(lock.releaseStart.toString());
    const endDate = unixToDate(lock.releaseEnd.toString());

    if (startDate > new Date()) return TimeLockStatus.pending;
    if (endDate < new Date()) return TimeLockStatus.expired;
    return TimeLockStatus.active;
  }

  const statusToText: Record<TimeLockStatus, string> = {
    active: t('ACTIVE'),
    pending: t('PENDING'),
    expired: t('EXPIRED')
  };

  const hasExpiredLocks = lockAmountData.some(lock => getLockStatus(lock) === 'expired');

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('CURRENT_TIME_LOCKS')}</h2>
        {hasExpiredLocks && (
          <Button look="secondary" onClick={onSetPurgeTimeLocksAmount}>
            {t('PURGE_EXPIRED')}
          </Button>
        )}
      </div>

      <div className="block__content">
        <Table
          tiny
          perPage={10}
          emptyTableMessage={t('NO_TIME_LOCKS')}
          table={lockAmountData.map((lock, i) => ({
            id: i + 1,
            amount: fromWei(lock.amount) + ' Q',
            status: (
              <>
                <StatusMark status={getLockStatus(lock)} />
                <span>{statusToText[getLockStatus(lock)]}</span>
              </>
            ),
            releaseStart: formatDate(unixToDate(lock.releaseStart.toString())),
            releaseEnd: formatDate(unixToDate(lock.releaseEnd.toString())),
          }))}
          columns={[
            {
              dataField: 'id',
              text: '#',
              sort: true,
              headerStyle: { minWidth: '40px' },
            },
            {
              dataField: 'amount',
              sort: true,
              text: t('AMOUNT'),
              headerStyle: { minWidth: '100px' },
            },
            {
              dataField: 'status',
              text: t('STATUS'),
              headerStyle: { minWidth: '100px' },
            },
            {
              dataField: 'releaseStart',
              sort: true,
              sortFunc: (a, b, order) => order === 'asc' ? compareDates(a, b) : compareDates(b, a),
              text: t('START_DATE'),
              formatter: (cell) => <span className="font-regular">{cell}</span>,
            },
            {
              dataField: 'releaseEnd',
              sort: true,
              sortFunc: (a, b, order) => order === 'asc' ? compareDates(a, b) : compareDates(b, a),
              text: t('END_DATE'),
              formatter: (cell) => <span className="font-regular">{cell}</span>,
            },
          ]}
        />
      </div>
    </StyledWrapper>
  );
}

export default TimeLocksTable;
