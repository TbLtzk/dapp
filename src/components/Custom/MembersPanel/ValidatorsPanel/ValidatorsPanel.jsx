import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

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

function ValidatorsPanel ({ buttons, tableType }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validatorTableTypes = {
    [TABLE_TYPES.validatorsShort]: {
      tableSelector: validatorsShortSelector,
      tableLoadingSelector: loadingValidatorsShortSelector,
      columns: getColumnsValidatorsWidened(t).slice(0, 3),
      tableWrap: tableValidatorsShort,
    },
    [TABLE_TYPES.validatorsWidened]: {
      tableSelector: validatorsWidenedSelector,
      tableLoadingSelector: loadingValidatorsWidenedSelector,
      columns: getColumnsValidatorsWidened(t),
      tableWrap: tableValidatorsWidened,
    },
    [TABLE_TYPES.validatorsMonitoring]: {
      tableSelector: validatorsMonitoringSelector,
      tableLoadingSelector: loadingValidatorsMonitoringSelector,
      columns: getColumnsValidatorsMonitoring(t),
      tableWrap: tableValidatorsMonitoring,
    },
  };

  const { tableSelector, tableLoadingSelector, columns, tableWrap } = validatorTableTypes[tableType];

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
    <CustomBlock>
      <MemberTables
        sorting
        title={t('VALIDATOR_RANKING')}
        emptyTableMessage={t('NO_VALIDATORS')}
        table={table}
        columns={columns}
        tableType={tableType}
        loading={tableLoading}
        perPageLength={10}
      />
      {buttons}
    </CustomBlock>
  );
}

export default ValidatorsPanel;
