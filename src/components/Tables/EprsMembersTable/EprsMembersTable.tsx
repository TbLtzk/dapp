import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Table from 'ui/Table';

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
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('LIST_OF_ROOT_NODE_SELECTION_EXPERTS')}</h3>
      </div>

      <div className="block__content">
        <Table
          tiny
          emptyTableMessage={t('NO_ROOT_NODE_SELECTION_MEMBERS')}
          perPage={5}
          loading={eprsMembersTableLoading}
          error={eprsMembersTableError}
          columns={[
            {
              dataField: 'member',
              text: t('MEMBER_ADDRESS'),
            },
          ]}
          table={eprsMembersTable.map((member: string, idx: number) => ({
            id: idx,
            member: (
              <ExplorerAddress
                iconed
                semibold
                address={member}
              />
            ),
          }))}
        />
      </div>
    </div>
  );
}

export default EprsMembersTable;
