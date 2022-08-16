import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Table from 'ui/Table';

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
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">
          <span>{t('LIST_OF_DEFI_EXPERTS')}</span>
          <InfoTooltip topic="defi-experts" />
        </h3>
      </div>

      <div className="block__content">
        <Table
          tiny
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

export default DeFiMembersTable;
