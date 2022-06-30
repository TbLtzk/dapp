import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'components/Base/Table';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Custom/InfoTooltip';

import { getEPQFIMembers } from 'store/membership/action-creators';
import {
  EPQFIMembersErrorSelector,
  EPQFIMembersLoadingSelector,
  EPQFIMembersSelector,
} from 'store/membership/selectors';

function QFeesMembersTable () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const qFeesMembersTable = useSelector(EPQFIMembersSelector);
  const qFeesMembersTableLoading = useSelector(EPQFIMembersLoadingSelector);
  const qFeesMembersTableError = useSelector(EPQFIMembersErrorSelector);

  useEffect(() => {
    dispatch(getEPQFIMembers());
  }, [dispatch]);

  return (
    <Table
      header={
        <h2 className="text-h2">
          <span>{t('LIST_OF_Q_FEES_INCENTIVES_EXPERTS')}</span>
          <InfoTooltip topic="fees-incentives-experts" />
        </h2>
      }
      emptyTableMessage={t('NO_Q_FEES_INCENTIVES_MEMBERS')}
      loading={qFeesMembersTableLoading}
      error={qFeesMembersTableError}
      perPageLength={10}
      columns={[
        {
          dataField: 'member',
          text: t('MEMBER_ADDRESS'),
        },
      ]}
      table={qFeesMembersTable.map((member, idx) => ({
        id: idx,
        member: <ExplorerAddress iconed address={member} />,
      }))}
    />
  );
}

export default QFeesMembersTable;
