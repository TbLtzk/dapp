import { useSelector } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';
import Button from 'ui/Button';
import Table from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import CustomBlock from 'components/Base/CustomBlock';
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
    address: <ExplorerAddress address={item.address} />,
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
    <CustomBlock>
      <Table
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
