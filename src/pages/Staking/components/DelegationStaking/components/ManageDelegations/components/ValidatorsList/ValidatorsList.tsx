import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ProgressBar from 'components/Base/ProgressBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import Table from 'ui/Table';

import DelegateModal from '../../../DelegateModal';

import { loadingValidatorsWidenedSelector, validatorsWidenedSelector } from 'store/validators/selectors';

import { formatAsset, parseNumber } from 'utils/numbers';

export interface Validator {
  address: string;
  alias: string;
  amount: string;
  delegatedStake: string;
  delegationEfficiency: string;
  delegationSaturation: string;
  delegatorShare: string;
  globalStakeShare: string;
  payoutPerDelegatedQ: string;
  payoutToDelegators: string;
  poolinterestRate: number;
  rank: number;
  selfStake: string;
  validator: string;
  validatorPoolBalance: string;
  validatorShare: number;
}

function ValidatorsList () {
  const { t } = useTranslation();
  const validators = useSelector(validatorsWidenedSelector);
  const validatorsLoading = useSelector(loadingValidatorsWidenedSelector);

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
          sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? parseNumber(b) - parseNumber(a) : parseNumber(a) - parseNumber(b)),
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '170px' }),
          dataField: 'delegatorShare',
          text: t('DELEGATOR_SHARE'),
          sort: true,
          sortFunc: (a:string, b:string, order:string) => (order === 'desc' ? parseNumber(b) - parseNumber(a) : parseNumber(a) - parseNumber(b)),
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
              address={validator.validator}
            />
            <AliasTooltip alias={validator.alias} />
          </div>
        ),
        totalDelegatedStake: formatAsset(validator.delegatedStake, 'Q'),
        delegatorShare: formatAsset(validator.delegatorShare, '%'),
        delegationSaturation: <ProgressBar value={validator.delegationSaturation} />,
        chooseValidator: <DelegateModal type="validator-select" delegation={validator}/>,
      }))}
    />
  );
}

export default ValidatorsList;
