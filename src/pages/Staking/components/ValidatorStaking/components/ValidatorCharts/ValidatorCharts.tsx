import { useTranslation } from 'react-i18next';

import { formatNumber } from '@q-dev/utils';

import DonutChart from 'components/DonutChart';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { StyledWrapper } from '../Validator/styles';

interface Props {
  validatorShare: string | number;
  delegatorsShare: string | number;
  selfStake: string | number;
  delegatedStake: string | number;
}
function ValidatorCharts ({ validatorShare = 0, delegatorsShare = 0, selfStake = 0, delegatedStake = 0 }: Props) {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();

  const stakeOptions = [
    { label: t('DELEGATOR_STAKE'), value: Number(delegatedStake) },
    { label: t('SELF_STAKE'), value: Number(selfStake) },
  ];

  const shareOptions = [
    { label: t('DELEGATOR_SHARE'), value: Number(delegatorsShare) },
    { label: t('VALIDATOR_SHARE'), value: Number(validatorShare) },
  ];

  return (
    <>
      <StyledWrapper gridArea="total-stake" className="block total-stake">
        <div className="block__header">
          <h3 className="text-h3 ">
            <span>{t('TOTAL_ACCOUNTABLE_STAKE')}</span>
          </h3>
        </div>
        <div className="block__content">
          <DonutChart
            totalLabel={t('TOTAL_STAKE')}
            formatValue={(val) => `${formatNumber(val, 2)} ${qTicker}`}
            options={stakeOptions}
          />
        </div>
      </StyledWrapper>
      <StyledWrapper gridArea="share" className="block">
        <div className="block__header">
          <h3 className="text-h3 ">
            <span>{t('VALIDATOR_DELEGATOR_SHARE')}</span>
          </h3>
        </div>
        <div className="block__content">
          <DonutChart
            totalLabel={t('SHARE')}
            formatValue={(val) => `${formatNumber(val, 2)} %`}
            options={shareOptions}
          />
        </div>
      </StyledWrapper>
    </>
  );
}

export default ValidatorCharts;
