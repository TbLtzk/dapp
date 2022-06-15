import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import MemberTables from 'components/Custom/MemberTables/MemberTables';

import { getEPDRMembers } from 'store/membership/action-creators';
import {
  EPDRMembersErrorSelector,
  EPDRMembersLoadingSelector,
  EPDRMembersSelector
} from 'store/membership/selectors';

import { columnsDeFiRisk } from 'constants/columns';
import { tableDefiRisks } from 'constants/tables';

function DefiMembersPanel () {
  const dispatch = useDispatch();

  const defiMembersTable = tableDefiRisks(useSelector(EPDRMembersSelector));
  const defiMembersTableLoading = useSelector(EPDRMembersLoadingSelector);
  const defiMembersTableError = useSelector(EPDRMembersErrorSelector);

  useEffect(() => {
    dispatch(getEPDRMembers());
  }, [dispatch]);

  return (
    <CustomBlock>
      <MemberTables
        title="List of DeFi Experts"
        emptyTableMessage="No DeFi members"
        table={defiMembersTable}
        loading={defiMembersTableLoading}
        error={defiMembersTableError}
        columns={columnsDeFiRisk}
        perPageLength={defiMembersTable.length}
      />
    </CustomBlock>
  );
}

export default DefiMembersPanel;
