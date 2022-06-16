import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import {
  getColumnsValidatorsMonitoring,
  getColumnsValidatorsWidened,
} from './columnTypes';

import { getValidatorMembers } from 'store/validators/action-creators';
import {
  loadingValidatorsMonitoringSelector,
  loadingValidatorsShortSelector,
  loadingValidatorsWidenedSelector,
  validatorsMonitoringSelector,
  validatorsShortSelector,
  validatorsWidenedSelector,
} from 'store/validators/selectors';

import { tableValidatorsMonitoring, tableValidatorsShort, tableValidatorsWidened } from 'constants/tables';
import TABLE_TYPES from 'constants/tableTypes';

const buttonsType = { qVault: 'q-vault', details: 'details', none: 'none' };

function ValidatorsPanel ({ buttons, tableType }) {
  const { t } = useTranslation();

  const { tableSelector, tableLoadingSelector, columns, tableWrapper } = getValidatorsTableData();
  const dispatch = useDispatch();
  const table = tableWrapper(useSelector(tableSelector));
  const tableLoading = useSelector(tableLoadingSelector);

  function getValidatorsTableData () {
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened:
        return {
          tableSelector: validatorsWidenedSelector,
          tableLoadingSelector: loadingValidatorsWidenedSelector,
          columns: getColumnsValidatorsWidened(t),
          tableWrapper: tableValidatorsWidened,
        };
      case TABLE_TYPES.validatorsShort:
        return {
          tableSelector: validatorsShortSelector,
          tableLoadingSelector: loadingValidatorsShortSelector,
          columns: getColumnsValidatorsWidened(t).slice(0, 3),
          tableWrapper: tableValidatorsShort,
        };
      case TABLE_TYPES.validatorsMonitoring:
        return {
          tableSelector: validatorsMonitoringSelector,
          tableLoadingSelector: loadingValidatorsMonitoringSelector,
          columns: getColumnsValidatorsMonitoring(t),
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
            <Link to="/validator-staking">
              <Button alwaysEnabled look="white">
                <i className="mdi mdi-arrow-right" />
                <span>{t('SEE_MORE_DETAILS')}</span>
              </Button>
            </Link>
            <Link to="/monitoring">
              <Button alwaysEnabled look="white">
                <i className="mdi mdi-arrow-right" />
                <span>{t('MONITORING')}</span>
              </Button>
            </Link>
          </div>
        );
      case buttonsType.qVault:
        return (
          <div className="card__actions">
            <Button
              alwaysEnabled
              look="white"
              onClick={() => history.push({ pathname: '/q-vault' })}
            >
              <i className="mdi mdi-arrow-right" />
              <span>{t('GO_TO_Q_VAULT')}</span>
            </Button>
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
        title={t('VALIDATOR_RANKING')}
        emptyTableMessage={t('NO_VALIDATORS')}
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
