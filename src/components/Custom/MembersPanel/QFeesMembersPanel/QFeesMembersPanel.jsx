import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Custom/InfoTooltip';
import MemberTables from 'components/Custom/MemberTables';

import { getEPQFIMembers } from 'store/membership/action-creators';
import {
  EPQFIMembersErrorSelector,
  EPQFIMembersLoadingSelector,
  EPQFIMembersSelector,
} from 'store/membership/selectors';

function QFeesMembersPanel () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const qFeesMembersTable = useSelector(EPQFIMembersSelector);
  const qFeesMembersTableLoading = useSelector(EPQFIMembersLoadingSelector);
  const qFeesMembersTableError = useSelector(EPQFIMembersErrorSelector);

  useEffect(() => {
    dispatch(getEPQFIMembers());
  }, [dispatch]);

  return (
    <CustomBlock>
      <h1>
        <span>{t('LIST_OF_Q_FEES_INCENTIVES_EXPERTS')}</span>
        <InfoTooltip topic="fees-incentives-experts" />
      </h1>

      <MemberTables
        emptyTableMessage={t('NO_Q_FEES_INCENTIVES_MEMBERS')}
        loading={qFeesMembersTableLoading}
        error={qFeesMembersTableError}
        perPageLength={qFeesMembersTable.length}
        columns={[
          {
            dataField: 'member',
            text: t('MEMBER_ADDRESS'),
          },
        ]}
        table={qFeesMembersTable.map((member, idx) => ({
          id: idx,
          member: <ExplorerAddress address={member} />,
        }))}
      />
    </CustomBlock>
  );
}

export default QFeesMembersPanel;
