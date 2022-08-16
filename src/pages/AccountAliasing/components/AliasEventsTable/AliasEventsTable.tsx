import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { invert } from 'lodash';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Check from 'ui/Check';
import Table from 'ui/Table';

import { aliasEventsLoadingSelector, aliasEventsSelector } from 'store/account-aliases/selectors';

import { trimAddress } from 'utils/strings';

function AliasEventsTable ({ address }: { address: string }) {
  const aliasEvents = useSelector(aliasEventsSelector);
  const isEventsLoading = useSelector(aliasEventsLoadingSelector);
  const { t } = useTranslation();

  const [isFiltered, setIsFiltered] = useState(false);

  const table = (aliasEvents as any[])
    .filter((item) => !isFiltered || item.returnValues._main === address)
    .map((item) => ({
      id: item.id,
      event: item.event,
      address: <ExplorerAddress address={item.address} />,
      alias: <ExplorerAddress address={item.alias} />,
      role: invert(AliasPurpose)[item.role] || '–',
    }));

  const columns = [
    { dataField: 'event', text: t('EVENT') },
    { dataField: 'address', text: t('MAIN_ACCOUNT'), headerStyle: { minWidth: '300px' }, },
    { dataField: 'alias', text: t('ALIAS'), headerStyle: { minWidth: '300px' }, },
    { dataField: 'role', text: t('ROLE') },
  ];

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">
          {isFiltered ? `${t('ALIASES_EVENTS')} (${trimAddress(address)})` : t('ALIASES_EVENTS')}
        </h3>
        <Check
          id="filter-alias-events"
          value={isFiltered}
          label={t('ONLY_CURRENT_ADDRESS')}
          onChange={() => setIsFiltered(!isFiltered)}
        />
      </div>

      <div className="block__content">
        <Table
          tiny
          columns={columns}
          table={table}
          loading={isEventsLoading}
          emptyTableMessage={t('NO_EVENTS')}
          perPage={20}
        />
      </div>
    </div>
  );
}

export default AliasEventsTable;
