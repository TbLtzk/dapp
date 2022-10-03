import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset, formatPercent } from '@q-dev/utils';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Table, { TableColumn } from 'ui/Table';

import { useRootNodes } from 'store/root-nodes/hooks';

function RootNodeTable () {
  const { t } = useTranslation();
  const {
    rootMembers,
    rootMembersLoading,
    rootTotalStake,
    getRootMembers
  } = useRootNodes();

  useEffect(() => {
    getRootMembers();
  }, []);

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
          {!rootMembersLoading && (
            <p style={{ margin: 0 }}>
              <strong>{t('TOTAL_STAKE')}</strong> {formatAsset(rootTotalStake, 'Q')}
            </p>
          )}
        </div>
      )}
      perPage={20}
      columns={columns}
      loading={rootMembersLoading}
      emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
      table={rootMembers.map((rootNode, idx) => ({
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
