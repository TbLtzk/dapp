import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import { getValidatorMembers } from 'store/validators/action-creators';
import {
  loadingValidatorsMonitoringSelector,
  loadingValidatorsShortSelector,
  loadingValidatorsWidenedSelector,
  validatorsMonitoringSelector,
  validatorsShortSelector,
  validatorsWidenedSelector,
} from 'store/validators/selectors';

import { columnsValidatorsMonitoring, columnsValidatorsWidened } from 'constants/columns';
import { tableValidatorsMonitoring, tableValidatorsShort, tableValidatorsWidened } from 'constants/tables';
import TABLE_TYPES from 'constants/tableTypes';

const buttonsType = { qVault: 'q-vault', details: 'details', none: 'none' };

function ValidatorsPanel ({ buttons, tableType }) {
  const { tableSelector, tableLoadingSelector, columns, tableWrapper } = getValidatorsTableData();
  const dispatch = useDispatch();
  const table = tableWrapper(useSelector(tableSelector));
  const tableLoading = useSelector(tableLoadingSelector);

  const history = useHistory();

  function getValidatorsTableData () {
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened:
        return {
          tableSelector: validatorsWidenedSelector,
          tableLoadingSelector: loadingValidatorsWidenedSelector,
          columns: columnsValidatorsWidened,
          tableWrapper: tableValidatorsWidened,
        };
      case TABLE_TYPES.validatorsShort:
        return {
          tableSelector: validatorsShortSelector,
          tableLoadingSelector: loadingValidatorsShortSelector,
          columns: columnsValidatorsWidened.slice(0, 3),
          tableWrapper: tableValidatorsShort,
        };
      case TABLE_TYPES.validatorsMonitoring:
        return {
          tableSelector: validatorsMonitoringSelector,
          tableLoadingSelector: loadingValidatorsMonitoringSelector,
          columns: columnsValidatorsMonitoring,
          tableWrapper: tableValidatorsMonitoring,
        };
    }
  }

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

  const renderButtons = () => {
    switch (buttons) {
      case buttonsType.details:
        return (
          <div className="card__actions__between">
            <Button
              alwaysEnabled
              look="white"
              icon="arrow-right"
              title="See more details"
              onClick={() =>
                history.push({
                  pathname: '/validator-staking',
                })
              }
            />
            <Button
              alwaysEnabled
              look="white"
              icon="arrow-right"
              title="Monitoring"
              onClick={() =>
                history.push({
                  pathname: '/monitoring',
                })
              }
            />
          </div>
        );
      case buttonsType.qVault:
        return (
          <div className="card__actions">
            <Button
              alwaysEnabled
              look="white"
              icon="arrow-right"
              title="Go to Q Vault"
              onClick={() =>
                history.push({
                  pathname: '/q-vault',
                })
              }
            />
          </div>
        );
      case buttonsType.none:
      default:
        return null;
    }
  };

  return (
    <CustomBlock>
      <MemberTables
        sorting
        title="Validator Ranking"
        emptyTableMessage="No validators"
        table={table}
        columns={columns}
        tableType={tableType}
        loading={tableLoading}
        perPageLength={10}
      />
      {renderButtons()}
    </CustomBlock>
  );
}

export default ValidatorsPanel;
