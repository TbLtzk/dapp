import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'components/Base/Table';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { getDelegationsList } from 'store/q-vault/action-creators';
import { delegationList, loadingDelegationList } from 'store/q-vault/selectors';

import { fromWei } from 'func/balance';
import { fN } from 'func/useful';

interface TableType {
  id: number;
  validator: string;
  actualStake: string;
  claimableReward: string;
}

function DelegatedValidatorsTable () {
  const { t } = useTranslation();

  const delegations = useSelector(delegationList);
  const loading = useSelector(loadingDelegationList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDelegationsList());
  }, [dispatch]);

  return (
    <Table
      header={
        <h2 className="text-h2">
          <span>{t('YOUR_CURRENT_DELEGATIONS')}</span>
        </h2>
      }
      emptyTableMessage={t('NO_DELEGATIONS')}
      perPage={5}
      loading={loading}
      columns={[
        {
          dataField: 'address',
          text: t('MEMBER_ADDRESS'),
        },
        {
          dataField: 'amount',
          text: t('CURRENT_STAKE'),
        },
        {
          dataField: 'reward',
          text: t('CLAIMABLE_REWARD'),
        },
      ]}
      table={delegations.map((member: TableType, idx: number) => ({
        id: idx,
        address: <ExplorerAddress iconed address={member.validator} />,
        amount: fN(fromWei(member.actualStake)) + ' Q',
        reward: fN(fromWei(member.claimableReward)) + ' Q',
      }))}
    />
  );
}

export default DelegatedValidatorsTable;
