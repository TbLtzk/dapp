import { useSelector } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';
import Button from 'ui/Button';
import Table from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

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
    address: (
      <ExplorerAddress
        iconed
        semibold
        address={item.address}
      />
    ),
    role: invert(AliasPurpose)[item.purpose] || 'Unknown',
    action: (
      <Tooltip
        position="top"
        disabled={userAddress === address}
        trigger={
          <Button
            compact
            look="ghost"
            disabled={userAddress !== address}
            onClick={() => onSelect(item)}
          >
            <span>Manage</span>
            <i className="mdi mdi-arrow-top-right" />
          </Button>
        }
      >
        Only available for alias owner
      </Tooltip>
    )
  }));

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">
          {`Account aliases (${trimAddress(address)})`}
        </h3>
      </div>

      <div className="block__content">
        <Table
          lineForEach
          tiny
          emptyTableMessage="No aliases"
          loading={isAliasesLoading}
          columns={columns}
          table={table}
          perPage={10}
        />
      </div>
    </div>
  );
}

export default AliasesTable;
