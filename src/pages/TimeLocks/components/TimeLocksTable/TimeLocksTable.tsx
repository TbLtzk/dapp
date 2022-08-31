import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Table from 'ui/Table';

import ManageForm from '../DepositForm';
import VestingWithdrawForm from '../VestingWithdrawForm';

import { BalanceValueWrap, ContentWrap, TimeLocksTableContent } from './styles';

import { setPurgeTimeLocksAmount } from 'store/locked-amount/action-creators';

import { CONTRACT_TYPES } from 'constants/contracts';
import { formatDate, unixToDate } from 'utils/date';

type ContractType = CONTRACT_TYPES.qVault |
CONTRACT_TYPES.root |
CONTRACT_TYPES.validators |
CONTRACT_TYPES.vesting

interface Props {
  title: string;
  contract: ContractType;
  balanceRef: RefObject<HTMLDivElement>;
  lockAmountData: any[];
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function onSetPurgeTimeLocksAmount () {
    dispatch(
      setPurgeTimeLocksAmount(
        { contract, address }, t('PURGE_EXPIRED_TIME_LOCKS_SUCCESS')
      )
    );
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
            releaseStart: formatDate(unixToDate(lock.releaseStart)),
            releaseEnd: formatDate(unixToDate(lock.releaseEnd)),
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
