import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

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
    <Table
      tiny
      header={
        <h2 className="text-h2">
          <span>{t('LIST_OF_DEFI_EXPERTS')}</span>
          <InfoTooltip topic="defi-experts" />
        </h2>
      }
      emptyTableMessage={t('NO_DEFI_MEMBERS')}
      loading={defiMembersTableLoading}
      error={defiMembersTableError}
      perPage={10}
      columns={[
        {
          dataField: 'member',
          text: t('MEMBER_ADDRESS'),
        },
      ]}
      table={defiMembersTable.map((member: string, idx: number) => ({
        id: idx,
        member: <ExplorerAddress iconed address={member} />,
      }))}
    />
  );
}

export default DeFiMembersTable;
