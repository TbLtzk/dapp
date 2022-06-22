import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import MemberTables from 'components/Custom/MemberTables';

import { getEPDRMembers } from 'store/membership/action-creators';
import { EPDRMembersErrorSelector, EPDRMembersLoadingSelector, EPDRMembersSelector } from 'store/membership/selectors';

function DefiMembersPanel () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const defiMembersTable = useSelector(EPDRMembersSelector);
  const defiMembersTableLoading = useSelector(EPDRMembersLoadingSelector);
  const defiMembersTableError = useSelector(EPDRMembersErrorSelector);

  useEffect(() => {
    dispatch(getEPDRMembers());
  }, [dispatch]);

  return (
    <CustomBlock>
      <MemberTables
        title={t('LIST_OF_DEFI_EXPERTS')}
        emptyTableMessage={t('NO_DEFI_MEMBERS')}
        loading={defiMembersTableLoading}
        error={defiMembersTableError}
        perPageLength={defiMembersTable.length}
        columns={[
          {
            dataField: 'member',
            text: t('MEMBER_ADDRESS'),
          },
        ]}
        table={defiMembersTable.map((member, idx) => ({
          id: idx,
          member: <ExplorerAddress address={member} />,
        }))}
      />
    </CustomBlock>
  );
}

export default DefiMembersPanel;
