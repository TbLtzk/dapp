import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';

import CustomBlock from 'components/Base/CustomBlock';
import Check from 'components/Base/Form/Check';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import MemberTables from 'components/Custom/MemberTables';

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
      <span>
        {isFiltered
          ? `Aliases events (${trimAddress(address)})`
          : 'Aliases events'
        }
      </span>
      <Check
        id="filter-alias-events"
        checked={isFiltered}
        label="Only current address"
        onChange={() => setIsFiltered(!isFiltered)}
      />
    </div>
  );

  return (
    <CustomBlock>
      <MemberTables
        title={tableTitle}
        columns={columns}
        table={table}
        loading={isEventsLoading}
        emptyTableMessage="No events"
        perPageLength={10}
      />
    </CustomBlock>
  );
}

export default AliasEventsTable;
