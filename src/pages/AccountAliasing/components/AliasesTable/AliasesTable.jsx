import React from 'react';
import { useSelector } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import Tooltip from 'components/Base/Tooltip';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import MemberTables from 'components/Custom/MemberTables';

import { aliasesLoadingSelector, aliasesSelector } from 'store/account-aliases/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'func/useful';

function AliasesTable ({ address, onSelect }) {
  const aliases = useSelector(aliasesSelector);
  const userAddress = useSelector(userAddressMetamask);
  const isAliasesLoading = useSelector(aliasesLoadingSelector);

  const columns = [
    { dataField: 'address', text: 'Address' },
    { dataField: 'role', text: 'Role' },
    { dataField: 'action', text: '', },
  ];

  const table = aliases.map((item, i) => ({
    id: i,
    address: <ExplorerAddress address={item.address} />,
    role: invert(AliasPurpose)[item.purpose] || 'Unknown',
    action: (
      <Tooltip
        position="top"
        additionalInfo="Only available for alias owner"
        disabled={userAddress === address}
      >
        <Button
          look="transparent"
          disabled={userAddress !== address}
          onClick={() => onSelect(item)}
        >
          <span>Manage</span>
          <i className="mdi mdi-arrow-top-right" />
        </Button>
      </Tooltip>
    )
  }));

  return (
    <CustomBlock>
      <MemberTables
        lineForEach
        title={`Account aliases (${trimAddress(address)})`}
        emptyTableMessage="No aliases"
        loading={isAliasesLoading}
        columns={columns}
        table={table}
        perPageLength={10}
      />
    </CustomBlock>
  );
}

export default AliasesTable;
