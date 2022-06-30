import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import Table from 'components/Base/Table';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Custom/InfoTooltip';

import { getEPDRMembers } from 'store/membership/action-creators';
import { EPDRMembersErrorSelector, EPDRMembersLoadingSelector, EPDRMembersSelector } from 'store/membership/selectors';

function DeFiMembersTable () {
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
      <h1>
        <span>{t('LIST_OF_DEFI_EXPERTS')}</span>
        <InfoTooltip topic="defi-experts" />
      </h1>

      <Table
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

export default DeFiMembersTable;
