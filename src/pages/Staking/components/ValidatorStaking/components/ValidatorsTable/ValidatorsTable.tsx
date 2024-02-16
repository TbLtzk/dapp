import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import Button from 'components/Button';
import RedirectAddress from 'components/Custom/RedirectAddress';
import Table from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useEnterShortList } from '../ManageValidator/components/ManageBalance/hooks';

import ValidatorsTableHeader from './ValidatorsTableHeader';

import { useConstitution } from 'store/constitution/hooks';
import { useValidators } from 'store/validators/hooks';

import { RoutePaths } from 'constants/routes';

const ValidatorsTableContainer = styled.div`
  .table .validators-table {
    &--active {
      box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primaryDark};
    }

    &--standby {
      box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.warningSecondary};
    }
  }
`;

function ValidatorsTable () {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();
  const {
    isValidator,
    validatorStats,
    validatorStatsLoading,
    checkIsValidator,
    loadValidatorStats
  } = useValidators();
  const enterShortList = useEnterShortList();
  const { maxNStandbyValidators, maxNValidators, getConstitutionParameters } = useConstitution();

  useEffect(() => {
    checkIsValidator();
    loadValidatorStats();
    getConstitutionParameters();
  }, []);

  return (
    <ValidatorsTableContainer>
      <Table
        buttons={!isValidator && <Button onClick={enterShortList}>{t('JOIN_VALIDATOR_RANKING')}</Button>}
        header={<ValidatorsTableHeader />}
        loading={validatorStatsLoading}
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
            filterValue: (cell) => cell.props.children[0].props.address,
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
        rowClasses={(row) => {
          if ('rank' in row) {
            const rank = Number(row.rank);
            if (rank <= maxNValidators) return 'validators-table--active';
            const maxNStandbyValidatorsRank = maxNStandbyValidators + maxNValidators;
            if (rank > maxNValidators && rank < maxNStandbyValidatorsRank) return 'validators-table--standby';
          }
          return '';
        }}
        table={
          validatorStats.map((validator) => ({
            id: validator.address,
            rank: validator.rank,
            validator: (
              <div style={{ display: 'flex' }}>
                <RedirectAddress
                  iconed
                  short
                  semibold
                  address={validator.address}
                  to={`${RoutePaths.stakingValidators}/${validator.address}`}
                />
                <AliasTooltip alias={validator.alias} />
              </div>
            ),
            totalStake: formatAsset(validator.poolInfo.totalStake, qTicker),
            selfStake: formatAsset(validator.poolInfo.selfStake, qTicker),
            delegatedStake: formatAsset(validator.poolInfo.delegatedStake, qTicker),
            validatorShare: formatPercent(validator.poolInfo.validatorShare),
            delegatorShare: formatPercent(validator.poolInfo.delegatorsShare),
          }))
        }
      />
    </ValidatorsTableContainer>
  );
}

export default ValidatorsTable;
