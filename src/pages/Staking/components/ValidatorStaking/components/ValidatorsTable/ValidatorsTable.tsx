import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Validator } from 'typings/validator';

import RedirectAddress from 'components/Custom/RedirectAddress';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import Table from 'ui/Table';

import { useEnterShortList } from '../ManageValidator/components/ManageBalance/hooks';

import { getIsUserValidator, getValidatorMembers } from 'store/validators/action-creators';
import {
  isUserValidatorSelector,
  loadingValidatorsWidenedSelector,
  validatorsWidenedSelector,
} from 'store/validators/selectors';

import { RoutePaths } from 'constants/routes';
import { formatAsset } from 'utils/numbers';

function ValidatorsTable () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const enterShortList = useEnterShortList();

  const validatorsTable = useSelector(validatorsWidenedSelector);
  const tableLoading = useSelector(loadingValidatorsWidenedSelector);
  const isValidator = useSelector(isUserValidatorSelector);

  useEffect(() => {
    dispatch(getIsUserValidator());
    dispatch(getValidatorMembers('validators-widened'));
  }, [dispatch]);

  return (
    <Table
      buttons={!isValidator && <Button onClick={enterShortList}>{t('JOIN_VALIDATOR_RANKING')}</Button>}
      header={
        <h2 className="text-h2">
          <span>{t('VALIDATOR_RANKING')}</span>
          <InfoTooltip topic="validator-ranking" />
        </h2>
      }
      loading={tableLoading}
      perPage={20}
      error=""
      emptyTableMessage={t('NO_VALIDATORS')}
      columns={[
        {
          headerStyle: () => ({ minWidth: '95px', cursor: 'pointer' }),
          dataField: 'rank',
          text: t('RANK'),
          sort: true,
        },
        {
          headerStyle: () => ({ minWidth: '200px' }),
          dataField: 'validator',
          text: t('ADDRESS'),
          filterValue: (cell: any) => cell.props.children[0].props.address,
        },
        {
          headerStyle: () => ({ minWidth: '145px', cursor: 'pointer' }),
          dataField: 'totalStake',
          text: t('TOTAL_STAKE'),
          sort: true,
        },
        {
          headerStyle: () => ({ minWidth: '145px', cursor: 'pointer' }),
          dataField: 'selfStake',
          text: t('SELF_STAKE'),
          sort: true,
        },
        {
          headerStyle: () => ({ minWidth: '165px', cursor: 'pointer' }),
          dataField: 'delegatedStake',
          text: t('DELEGATED_STAKE'),
          sort: true,
        },
        {
          headerStyle: () => ({ minWidth: '100px', cursor: 'pointer' }),
          dataField: 'validatorShare',
          text: t('VALIDATOR_SHARE'),
          sort: true,
        },
        {
          headerStyle: () => ({ minWidth: '100px', cursor: 'pointer' }),
          dataField: 'delegatorShare',
          text: t('DELEGATOR_SHARE'),
          sort: true,
        },
      ]}
      table={validatorsTable.map((validator: Validator) => ({
        id: validator.address,
        rank: validator.rank,
        validator: (
          <div style={{ display: 'flex' }}>
            <RedirectAddress
              iconed
              short
              address={validator.address}
              to={`${RoutePaths.stakingValidators}/${validator.address}`}
            />
            <AliasTooltip alias={validator.alias} />
          </div>
        ),
        totalStake: formatAsset(validator.totalStake, 'Q'),
        selfStake: formatAsset(validator.selfStake, 'Q'),
        delegatedStake: formatAsset(validator.delegatedStake, 'Q'),
        validatorShare: formatAsset(validator.validatorShare, ' %'),
        delegatorShare: formatAsset(validator.delegatorShare, ' %'),
      }))}
    />
  );
}

export default ValidatorsTable;
