import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Alias, AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';
import Button from 'ui/Button';
import Table from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { aliasesLoadingSelector, aliasesSelector } from 'store/account-aliases/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'func/useful';

interface Props {
  address: string;
  onSelect: (alias: Alias) => void;
}

function AliasesTable ({ address, onSelect }: Props) {
  const { t } = useTranslation();

  const aliases = useSelector(aliasesSelector);
  const userAddress = useSelector(userAddressMetamask);
  const isAliasesLoading = useSelector(aliasesLoadingSelector);

  const columns = [
    {
      dataField: 'address',
      text: t('ADDRESS'),
      headerStyle: { minWidth: '300px' },
    },
    { dataField: 'role', text: t('ROLE') },
    { dataField: 'action', text: '' },
  ];

  const table = (aliases as any[]).map((item, i) => ({
    id: i,
    address: <ExplorerAddress
      iconed
      semibold
      address={item.address}
    />,
    role: invert(AliasPurpose)[item.purpose] || t('UNKNOWN'),
    action: (
      <Tooltip
        disabled={userAddress === address}
        trigger={
          <Button
            compact
            look="ghost"
            disabled={userAddress !== address}
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
