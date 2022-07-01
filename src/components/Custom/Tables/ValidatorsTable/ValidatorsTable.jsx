import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'components/Base/Table';
import InfoTooltip from 'components/Custom/InfoTooltip';

import { getColumnsValidatorsMonitoring, getColumnsValidatorsWidened } from './columnTypes';
import { tableValidatorsMonitoring, tableValidatorsShort, tableValidatorsWidened } from './tablesTypes';

import { getValidatorMembers } from 'store/validators/action-creators';
import {
  loadingValidatorsMonitoringSelector,
  loadingValidatorsShortSelector,
  loadingValidatorsWidenedSelector,
  validatorsMonitoringSelector,
  validatorsShortSelector,
  validatorsWidenedSelector,
} from 'store/validators/selectors';

import TABLE_TYPES from 'constants/tableTypes';

function ValidatorsTable({ buttons, tableType }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validatorTableTypes = {
    [TABLE_TYPES.validatorsShort]: {
      tiny: true,
      search: false,
      tableSelector: validatorsShortSelector,
      tableLoadingSelector: loadingValidatorsShortSelector,
      columns: getColumnsValidatorsWidened(t).slice(0, 3),
      tableWrap: tableValidatorsShort,
    },
    [TABLE_TYPES.validatorsWidened]: {
      tiny: false,
      search: true,
      tableSelector: validatorsWidenedSelector,
      tableLoadingSelector: loadingValidatorsWidenedSelector,
      columns: getColumnsValidatorsWidened(t),
      tableWrap: tableValidatorsWidened,
    },
    [TABLE_TYPES.validatorsMonitoring]: {
      tiny: false,
      search: true,
      tableSelector: validatorsMonitoringSelector,
      tableLoadingSelector: loadingValidatorsMonitoringSelector,
      columns: getColumnsValidatorsMonitoring(t),
      tableWrap: tableValidatorsMonitoring,
    },
  };

  const { tableSelector, tableLoadingSelector, columns, tableWrap, search, tiny } = validatorTableTypes[tableType];

  const table = tableWrap(useSelector(tableSelector));
  const tableLoading = useSelector(tableLoadingSelector);

  const fetchTableData = () => {
    dispatch(getValidatorMembers(tableType));
  };

  useEffect(() => {
    let monitoringInterval;

    fetchTableData();

    if (tableType === TABLE_TYPES.validatorsMonitoring) {
      monitoringInterval = setInterval(() => {
        fetchTableData();
      }, 60000);
    }
    return () => clearInterval(monitoringInterval);
  }, [dispatch, tableType]);

  return (
    <>
      <Table
        search={search}
        tiny={tiny}
        header={
          <h2 className="text-h2">
            <span>{t('VALIDATOR_RANKING')}</span>
            <InfoTooltip topic="validator-ranking" />
          </h2>
        }
        emptyTableMessage={t('NO_VALIDATORS')}
        table={table}
        columns={columns}
        tableType={tableType}
        loading={tableLoading}
        perPage={3}
        bottomButtons={buttons}
      />
    </>
  );
}

export default ValidatorsTable;
