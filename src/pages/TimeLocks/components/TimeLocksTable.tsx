import { useTranslation } from 'react-i18next';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { formatAsset } from '@q-dev/utils';
import { getLockStatus } from 'helpers/time-locks';
import styled from 'styled-components';
import { TimeLockContractType } from 'typings/contracts';

import Button from 'components/Button';
import Table from 'components/Table';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useTransaction } from 'store/transaction/hooks';

import { purgeTimeLocks } from 'contracts/helpers/locked-amount-helper';

import { TimeLockStatus } from 'constants/statuses';
import { compareDates, formatDate, unixToDate } from 'utils/date';
import { fromWei } from 'utils/web3';

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
    switch (status) {
      case TimeLockStatus.unlocked:
        return theme.colors.successMain;
      case TimeLockStatus.unlocking:
        return theme.colors.warningPrimary;
      case TimeLockStatus.locked:
        return theme.colors.errorMain;
    }
  }};
`;

interface Props {
  contract: TimeLockContractType;
  lockAmountData: TimeLockEntry[];
  address: string;
  isLoading?: boolean;
  onSubmit: () => void;
}

function TimeLocksTable ({
  contract,
  lockAmountData,
  address,
  isLoading,
  onSubmit,
}: Props) {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { qTicker } = useNetworkConfig();

  const statusToText: Record<TimeLockStatus, string> = {
    locked: t('LOCKED'),
    unlocking: t('UNLOCKING'),
    unlocked: t('UNLOCKED')
  };

  const hasUnlockedLocks = lockAmountData.some(lock => getLockStatus(lock) === TimeLockStatus.unlocked);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('CURRENT_TIME_LOCKS')}</h2>
        {hasUnlockedLocks && (
          <Button
            look="secondary"
            onClick={() => submitTransaction({
              successMessage: t('PURGE_EXPIRED_TIME_LOCKS_TX'),
              submitFn: () => purgeTimeLocks({ address, contractType: contract }),
              onSuccess: () => onSubmit()
            })}
          >
            {t('PURGE_UNLOCKED')}
          </Button>
        )}
      </div>

      <div className="block__content">
        <Table
          tiny
          perPage={10}
          emptyTableMessage={t('NO_TIME_LOCKS')}
          loading={isLoading}
          table={lockAmountData.map((lock, i) => ({
            id: i + 1,
            amount: formatAsset(fromWei(lock.amount), qTicker),
            status: (
              <>
                <StatusMark status={getLockStatus(lock)} />
                <span>{statusToText[getLockStatus(lock)]}</span>
              </>
            ),
            releaseStart: formatDate(unixToDate(lock.releaseStart.toString()), i18n.language),
            releaseEnd: formatDate(unixToDate(lock.releaseEnd.toString()), i18n.language),
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
