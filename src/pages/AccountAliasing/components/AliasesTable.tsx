import { useTranslation } from 'react-i18next';

import { Alias, AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Table from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import { useAliases } from 'store/aliases/hooks';
import { useUser } from 'store/user/hooks';

import { trimAddress } from 'utils/strings';

interface Props {
  address: string;
  onSelect: (alias: Alias) => void;
}

function AliasesTable ({ address, onSelect }: Props) {
  const { t } = useTranslation();

  const { aliases, isAliasesLoading } = useAliases();
  const user = useUser();

  const columns = [
    {
      dataField: 'address',
      text: t('ADDRESS'),
      headerStyle: { minWidth: '300px' },
    },
    { dataField: 'role', text: t('ROLE') },
    { dataField: 'action', text: '' },
  ];

  const table = aliases.map((item, i) => ({
    id: i,
    address: <ExplorerAddress
      iconed
      semibold
      address={item.address}
    />,
    role: invert(AliasPurpose)[item.purpose] || t('UNKNOWN'),
    action: (
      <Tooltip
        disabled={user.address === address}
        trigger={
          <Button
            compact
            look="ghost"
            disabled={user.address !== address}
            onClick={() => onSelect(item)}
          >
            <span>{t('MANAGE')}</span>
            <i className="mdi mdi-arrow-top-right" />
          </Button>
        }
      >
        {t('ONLY_AVAILABLE_FOR_ALIAS_OWNER')}
      </Tooltip>
    ),
  }));

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">{`${t('ACCOUNT_ALIASES')} (${trimAddress(address)})`}</h3>
      </div>

      <div className="block__content">
        <Table
          tiny
          emptyTableMessage={t('NO_ALIASES')}
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
