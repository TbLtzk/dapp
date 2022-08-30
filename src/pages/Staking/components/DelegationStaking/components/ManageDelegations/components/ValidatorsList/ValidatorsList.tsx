import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Validator } from 'typings/validator';

import ProgressBar from 'components/Base/ProgressBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import Table from 'ui/Table';

import useMetamaskReset from 'hooks/useMetamaskReset';

import DelegateModal from '../../../DelegateModal';

import { getValidatorMembers } from 'store/validators/action-creators';
import { loadingValidatorsWidenedSelector, validatorsWidenedSelector } from 'store/validators/selectors';

import formTypes from 'constants/form-types';
import { TABLE_TYPES } from 'constants/tableTypes';
import { formatAsset } from 'utils/numbers';

function ValidatorsList () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validators = useSelector(validatorsWidenedSelector);
  const validatorsLoading = useSelector(loadingValidatorsWidenedSelector);

  useMetamaskReset(formTypes.qVaultDelegation, () => dispatch(getValidatorMembers(TABLE_TYPES.validatorsWidened)));

  return (
    <Table
      emptyTableMessage={t('NO_VALIDATORS')}
      perPage={1000}
      loading={validatorsLoading}
      columns={[
        {
          headerStyle: () => ({ minWidth: '190px' }),
          dataField: 'validator',
          text: t('ADDRESS'),
          filterValue: (cell: any) => cell.props.children[0].props.address,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '200px' }),
          dataField: 'totalDelegatedStake',
          text: t('TOTAL_DELEGATED_STAKE'),
          sort: true,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '170px' }),
          dataField: 'delegatorShare',
          text: t('DELEGATOR_SHARE'),
          sort: true,
        },
        {
          dataField: 'delegationSaturation',
          text: t('DELEGATION_SATURATION'),
        },
        {
          dataField: 'chooseValidator',
          text: '',
        },
      ]}
      table={validators.map((validator: Validator) => ({
        id: validator.address,
        rank: validator.rank,
        validator: (
          <div style={{ display: 'flex' }}>
            <ExplorerAddress
              short
              iconed
              semibold
              address={validator.address}
            />
            <AliasTooltip alias={validator.alias} />
          </div>
        ),
        totalDelegatedStake: formatAsset(validator.delegatedStake, 'Q'),
        delegatorShare: formatAsset(validator.delegatorShare, ' %'),
        delegationSaturation: <ProgressBar value={validator.delegationSaturation} />,
        chooseValidator: <DelegateModal type="validator-select" delegation={validator}/>,
      }))}
    />
  );
}

export default ValidatorsList;
