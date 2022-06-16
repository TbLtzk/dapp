import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import MemberTables from 'components/Custom/MemberTables';

import { getEPRSMembers } from 'store/membership/action-creators';
import { EPRSMembersErrorSelector, EPRSMembersLoadingSelector, EPRSMembersSelector } from 'store/membership/selectors';

function EprsMembersPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const eprsMembersTable = useSelector(EPRSMembersSelector);
  const eprsMembersTableLoading = useSelector(EPRSMembersLoadingSelector);
  const eprsMembersTableError = useSelector(EPRSMembersErrorSelector);

  useEffect(() => {
    dispatch(getEPRSMembers());
  }, [dispatch]);

  return (
    <CustomBlock>
      <MemberTables
        title={t('LIST_OF_ROOT_NODE_SELECTION_EXPERTS')}
        emptyTableMessage={t('NO_ROOT_NODE_SELECTION_MEMBERS')}
        perPageLength={eprsMembersTable.length}
        loading={eprsMembersTableLoading}
        error={eprsMembersTableError}
        columns={[
          {
            dataField: 'member',
            text: t('MEMBER_ADDRESS'),
          },
        ]}
        table={eprsMembersTable.map((member, idx) => ({
          id: idx,
          member: <ExplorerAddress address={member} />,
        }))}
      />
    </CustomBlock>
  );
}

export default EprsMembersPanel;
