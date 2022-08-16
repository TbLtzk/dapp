import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { StakeDelegationInfo } from '@q-dev/q-js-sdk';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Table from 'ui/Table';

import DelegateModal from '../DelegateModal';

import { getDelegationsList, setDelegateStake } from 'store/q-vault/action-creators';
import { delegationList, loadingDelegationList } from 'store/q-vault/selectors';

import { fillArray } from 'utils/arrays';
import { formatAsset, parseNumber } from 'utils/numbers';

export interface Delegation {
  id: number;
  validator: string;
  actualStake: string;
  claimableReward: string;
  delegatorShare: string;
}

function DelegationsTable () {
  const { t } = useTranslation();

  const delegations = useSelector(delegationList);
  const loading = useSelector(loadingDelegationList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDelegationsList());
  }, [dispatch]);

  const removeOneDelegation = (address: string) => {
    dispatch(setDelegateStake([address], ['0'], t('REMOVE_STAKE_SUCCESSFUL')));
  };

  const removeAllDelegations = () => {
    const addressesToRemove = delegations.map((delegation: StakeDelegationInfo) => delegation.validator);
    const zerosAmount = fillArray(addressesToRemove.length).map((_) => '0');
    dispatch(setDelegateStake(addressesToRemove, zerosAmount, t('REMOVE_ALL_STAKES_SUCCESS')));
  };

  return (
    <Table
      header={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '20px',
          }}
        >
          <h2 className="text-h2">{t('YOUR_CURRENT_DELEGATIONS')}</h2>
        </div>
      }
      emptyTableMessage={t('NO_DELEGATIONS')}
      perPage={20}
      buttons={
        delegations.length > 0 && (
          <Button look="danger" onClick={removeAllDelegations}>
            {t('UNSTAKE_ALL')}
          </Button>
        )
      }
      loading={loading}
      columns={[
        {
          dataField: 'address',
          text: t('VALIDATOR_ADDRESS'),
          headerStyle: () => ({ minWidth: '200px' }),
          filterValue: (cell: any) => cell.props.address,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '150px' }),
          dataField: 'amount',
          text: t('CURRENT_STAKE'),
          sort: true,
          sortFunc: (a: string, b: string, order: string) =>
            order === 'desc' ? parseNumber(b) - parseNumber(a) : parseNumber(a) - parseNumber(b),
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '150px' }),
          dataField: 'reward',
          text: t('Your Reward'),
          sort: true,
          sortFunc: (a: string, b: string, order: string) =>
            order === 'desc' ? parseNumber(b) - parseNumber(a) : parseNumber(a) - parseNumber(b),
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '160px' }),
          dataField: 'delegatorShare',
          text: t('Delegator Share'),
          sort: true,
          sortFunc: (a: string, b: string, order: string) =>
            order === 'desc' ? parseNumber(b) - parseNumber(a) : parseNumber(a) - parseNumber(b),
        },
        {
          dataField: 'manage',
          text: '',
        },
      ]}
      table={delegations.map((delegation: Delegation, idx: number) => ({
        id: idx,
        address: <ExplorerAddress
          iconed
          short
          address={delegation.validator}
        />,
        delegatorShare: formatAsset(delegation.delegatorShare, '%'),
        amount: formatAsset(delegation.actualStake, 'Q'),
        reward: formatAsset(delegation.claimableReward, 'Q'),
        manage: (
          <>
            <DelegateModal type="delegator-select" delegation={delegation} />
            <Button
              compact
              look="danger"
              style={{ marginLeft: '16px' }}
              onClick={() => removeOneDelegation(delegation.validator)}
            >
              {t('UNSTAKE')}
            </Button>
          </>
        ),
      }))}
    />
  );
}

export default DelegationsTable;
