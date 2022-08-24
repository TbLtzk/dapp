import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Table, { TableColumn } from 'ui/Table';

import { getRootMembers } from 'store/root-node/action-creators';
import {
  loadingRootMembersSelector,
  rootMembersSelector,
  rootMemebersTotalStakeSelector,
} from 'store/root-node/selectors';

import { TABLE_TYPES } from 'constants/tableTypes';
import { formatAsset, formatPercent } from 'utils/numbers';

function RootNodeTable () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const table = useSelector(rootMembersSelector);
  const tableLoading = useSelector(loadingRootMembersSelector);
  const rootMemebersTotalStake = useSelector(rootMemebersTotalStakeSelector);

  useEffect(() => {
    dispatch(getRootMembers(TABLE_TYPES.rootNodesWidened));
  }, [dispatch]);

  const columns: TableColumn[] = [
    {
      headerStyle: () => ({ minWidth: '300px', }),
      dataField: 'address',
      text: t('ROOT_NODE_ADDRESS'),
      filterValue: (cell) => cell.props.address,
    },
    {
      headerStyle: () => ({ minWidth: '180px', cursor: 'pointer' }),
      dataField: 'amount',
      text: t('STAKED_AMOUNT'),
      sort: true,
    },
    {
      headerStyle: () => ({ minWidth: '90px', cursor: 'pointer' }),
      dataField: 'share',
      text: t('SHARE'),
      sort: true,
    },
  ];

  return (
    <Table
      header={(
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '20px'
          }}
        >
          <h2 className="text-h2">
            <span>{t('ROOT_NODE_PANEL')}</span>
            <InfoTooltip topic="root-node-panel" />
          </h2>
          {!tableLoading && (
            <p style={{ margin: 0 }}>
              <strong>{t('TOTAL_STAKE')}</strong> {formatAsset(rootMemebersTotalStake, 'Q')}
            </p>
          )}
        </div>
      )}
      perPage={20}
      columns={columns}
      loading={tableLoading}
      emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
      table={table.map((rootNode:any, idx:number) => ({
        id: idx,
        address: (
          <ExplorerAddress
            iconed
            semibold
            address={rootNode.address}
          />
        ),
        amount: formatAsset(rootNode.stakeAmount, 'Q'),
        share: formatPercent(rootNode.share),
      }))}
    />
  );
}

export default RootNodeTable;
