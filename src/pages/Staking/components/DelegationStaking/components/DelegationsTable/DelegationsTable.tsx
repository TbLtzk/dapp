import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { fillArray, formatAsset, formatPercent } from '@q-dev/utils';

import Button from 'components/Button';
import RedirectAddress from 'components/Custom/RedirectAddress';
import Table from 'components/Table';

import DelegateModal from '../DelegateModal';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { RoutePaths } from 'constants/routes';

function DelegationsTable () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const {
    delegationList,
    loadingDelegationList,
    loadDelegationList,
    delegateStake
  } = useQVault();

  useEffect(() => {
    loadDelegationList();
  }, []);

  const removeOneDelegation = (address: string) => {
    submitTransaction({
      successMessage: t('REMOVE_STAKE_SUCCESSFUL'),
      submitFn: () => delegateStake({
        addresses: [address],
        stakes: ['0'],
      })
    });
  };

  const removeAllDelegations = () => {
    const addressesToRemove = delegationList.map(delegation => delegation.validator);
    const zerosAmount = fillArray(addressesToRemove.length).map((_) => '0');

    submitTransaction({
      successMessage: t('REMOVE_ALL_STAKES_SUCCESS'),
      submitFn: () => delegateStake({
        addresses: addressesToRemove,
        stakes: zerosAmount,
      })
    });
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
        delegationList.length > 0 && (
          <Button look="danger" onClick={removeAllDelegations}>
            {t('UNSTAKE_ALL')}
          </Button>
        )
      }
      loading={loadingDelegationList}
      columns={[
        {
          dataField: 'address',
          text: t('VALIDATOR_ADDRESS'),
          headerStyle: () => ({ minWidth: '200px' }),
          filterValue: (cell) => cell.props.address,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '150px' }),
          dataField: 'amount',
          text: t('CURRENT_STAKE'),
          sort: true,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '150px' }),
          dataField: 'reward',
          text: t('CLAIMABLE_REWARD'),
          sort: true,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '160px' }),
          dataField: 'delegatorsShare',
          text: t('DELEGATOR_SHARE'),
          sort: true,
        },
        {
          dataField: 'manage',
          text: '',
        },
      ]}
      table={delegationList.map((delegation, idx) => ({
        id: idx,
        address: (
          <RedirectAddress
            iconed
            short
            semibold
            address={delegation.validator}
            to={`${RoutePaths.stakingValidators}/${delegation.validator}?from=${RoutePaths.stakingDelegations}`}
          />
        ),
        delegatorsShare: formatPercent(delegation.delegatorsShare),
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
