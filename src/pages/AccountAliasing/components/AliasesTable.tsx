import { useTranslation } from 'react-i18next';

import { Alias, AliasPurpose } from '@q-dev/q-js-sdk';
import { Tooltip } from '@q-dev/q-ui-kit';
import { trimString } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import invert from 'lodash/invert';

import Button from 'components/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Table from 'components/Table';

import { useAliases } from 'store/aliases/hooks';

interface Props {
  address: string;
  onSelect: (alias: Alias) => void;
}

function AliasesTable ({ address, onSelect }: Props) {
  const { t } = useTranslation();

  const { aliases, isAliasesLoading } = useAliases();
  const { address: accountAddress } = useWeb3Context();

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
        disabled={accountAddress.toLowerCase() === address.toLowerCase()}
        trigger={
          <Button
            compact
            look="ghost"
            disabled={accountAddress.toLowerCase() !== address.toLowerCase()}
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
        <h3 className="text-h3">{`${t('ACCOUNT_ALIASES')} (${trimString(address)})`}</h3>
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
