import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'ui/Table';

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
    <Table
      tiny
      emptyTableMessage={t('NO_ROOT_NODE_SELECTION_MEMBERS')}
      perPage={5}
      loading={eprsMembersTableLoading}
      error={eprsMembersTableError}
      header={<h2 className="text-h2">{t('LIST_OF_ROOT_NODE_SELECTION_EXPERTS')}</h2>}
      columns={[
        {
          dataField: 'member',
          text: t('MEMBER_ADDRESS'),
        },
      ]}
      table={eprsMembersTable.map((member: string, idx: number) => ({
        id: idx,
        member: <ExplorerAddress iconed address={member} />,
      }))}
    />
  );
}

export default EprsMembersTable;
