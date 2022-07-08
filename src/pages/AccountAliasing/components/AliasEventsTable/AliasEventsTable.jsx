import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';
import Check from 'ui/Check';
import Table from 'ui/Table';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { aliasEventsLoadingSelector, aliasEventsSelector } from 'store/account-aliases/selectors';

import { trimAddress } from 'func/useful';

function AliasEventsTable ({ address }) {
  const aliasEvents = useSelector(aliasEventsSelector);
  const isEventsLoading = useSelector(aliasEventsLoadingSelector);

  const [isFiltered, setIsFiltered] = useState(false);

  const table = aliasEvents
    .filter(item => !isFiltered || item.returnValues._main === address)
    .map(item => ({
      id: item.id,
      event: item.event,
      address: <ExplorerAddress address={item.address} />,
      alias: <ExplorerAddress address={item.alias} />,
      role: invert(AliasPurpose)[item.role] || '–',
    }));

  const columns = [
    { dataField: 'event', text: 'Event', },
    { dataField: 'address', text: 'Main Account', },
    { dataField: 'alias', text: 'Alias', },
    { dataField: 'role', text: 'Role', },
  ];

  const tableTitle = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >

    </div>
  );

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">
          {isFiltered
            ? `Aliases events (${trimAddress(address)})`
            : 'Aliases events'
          }
        </h3>
        <Check
          id="filter-alias-events"
          value={isFiltered}
          label="Only current address"
          onChange={() => setIsFiltered(!isFiltered)}
        />
      </div>

      <div className="block__content">
        <Table
          tiny
          header={tableTitle}
          columns={columns}
          table={table}
          loading={isEventsLoading}
          emptyTableMessage="No events"
          perPage={10}
        />
      </div>
    </div>
  );
}

export default AliasEventsTable;
