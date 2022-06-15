import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import { getEPRSMembers } from 'store/membership/action-creators';
import { EPRSMembersErrorSelector, EPRSMembersLoadingSelector, EPRSMembersSelector } from 'store/membership/selectors';

import { columnsEprs } from 'constants/columns';
import { tableEprs } from 'constants/tables';

function EprsMembersPanel () {
  const dispatch = useDispatch();

  const eprsMembersTable = tableEprs(useSelector(EPRSMembersSelector));
  const eprsMembersTableLoading = useSelector(EPRSMembersLoadingSelector);
  const eprsMembersTableError = useSelector(EPRSMembersErrorSelector);

  useEffect(() => {
    dispatch(getEPRSMembers());
  }, [dispatch]);

  return (
    <CustomBlock>
      <MemberTables
        title="List of Root Node Selection Experts"
        emptyTableMessage="Empty list"
        table={eprsMembersTable}
        loading={eprsMembersTableLoading}
        error={eprsMembersTableError}
        columns={columnsEprs}
        perPageLength={eprsMembersTable.length}
      />
    </CustomBlock>
  );
}

export default EprsMembersPanel;
