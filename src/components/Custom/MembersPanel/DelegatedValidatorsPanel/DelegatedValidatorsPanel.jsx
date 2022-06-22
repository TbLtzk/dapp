import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import MemberTables from 'components/Custom/MemberTables';

import { getDelegationsList } from 'store/q-vault/action-creators';
import { delegationList, loadingDelegationList } from 'store/q-vault/selectors';

import { fromWei } from 'func/balance';
import { fN } from 'func/useful';

function DelegatedValidatorsPanel () {
  const { t } = useTranslation();

  const delegations = useSelector(delegationList);
  const loading = useSelector(loadingDelegationList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDelegationsList());
  }, [dispatch]);

  return (
    <MemberTables
      title={t('YOUR_CURRENT_DELEGATIONS')}
      emptyTableMessage={t('NO_DELEGATIONS')}
      perPageLength={delegations.length}
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
      table={delegations.map((member, idx) => ({
        id: idx,
        address: <ExplorerAddress address={member.validator} />,
        amount: fN(fromWei(member.actualStake)) + ' Q',
        reward: fN(fromWei(member.claimableReward)) + ' Q',
      }))}
    />
  );
}

export default DelegatedValidatorsPanel;
