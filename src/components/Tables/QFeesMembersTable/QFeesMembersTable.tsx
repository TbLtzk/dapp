import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'ui/Table';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

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
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">
          <span>{t('LIST_OF_Q_FEES_INCENTIVES_EXPERTS')}</span>
          <InfoTooltip topic="fees-incentives-experts" />
        </h3>
      </div>

      <div className="block__content">
        <Table
          tiny
          emptyTableMessage={t('NO_Q_FEES_INCENTIVES_MEMBERS')}
          loading={qFeesMembersTableLoading}
          error={qFeesMembersTableError}
          perPage={5}
          columns={[
            {
              dataField: 'member',
              text: t('MEMBER_ADDRESS'),
            },
          ]}
          table={qFeesMembersTable.map((member: string, idx: number) => ({
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

export default QFeesMembersTable;
