import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import Table from 'components/Base/Table';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { getEPRSMembers } from 'store/membership/action-creators';
import { EPRSMembersErrorSelector, EPRSMembersLoadingSelector, EPRSMembersSelector } from 'store/membership/selectors';

function EprsMembersTable () {
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
      <Table
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

export default EprsMembersTable;
