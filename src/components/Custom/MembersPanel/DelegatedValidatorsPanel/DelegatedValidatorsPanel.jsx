import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MemberTables from 'components/Custom/MemberTables/MemberTables';

import { getDelegationsList } from 'store/q-vault/action-creators';
import { delegationList, loadingDelegationList } from 'store/q-vault/selectors';

import { columnsDelegations } from 'constants/columns';
import { tableDelegations } from 'constants/tables';

function DelegatedValidatorsPanel () {
  const loading = useSelector(loadingDelegationList);
  const delegations = tableDelegations(useSelector(delegationList));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDelegationsList());
  }, [dispatch]);

  return (
    <>
      <MemberTables
        title="Your Current Delegations"
        emptyTableMessage="No delegations"
        perPageLength={delegations.length}
        table={delegations}
        loading={loading}
        columns={columnsDelegations}
      />
    </>
  );
}

export default DelegatedValidatorsPanel;
