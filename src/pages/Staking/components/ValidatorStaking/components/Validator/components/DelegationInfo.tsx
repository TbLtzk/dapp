import { useTranslation } from 'react-i18next';

import { formatAsset, formatPercent } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';

import ProgressBar from 'components/Base/ProgressBar';
import DelegateModal from 'pages/Staking/components/DelegationStaking/components/DelegateModal';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { StyledWrapper } from '../styles';
import { useValidator } from '../Validator';

function DelegationInfo () {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();
  const { address: accountAddress } = useWeb3Context();
  const { validator, refetchValidator } = useValidator();
  const { metric, payoutPerDelegatedQ, address } = validator;

  return (
    <StyledWrapper gridArea="delegation-info" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('DELEGATION_INFO')}</h3>
        {accountAddress.toLowerCase() !== address.toLowerCase() && (
          <DelegateModal
            btnTitle={t('DELEGATE')}
            validator={validator}
            onClose={refetchValidator}
          />
        )}
      </div>

      <div className="row block__content">
        <p className="color-secondary text-md">{t('PAYOUT_DELEGATED_Q', { asset: qTicker })}</p>
        <p className="color-primary text-md">{formatAsset(payoutPerDelegatedQ, qTicker)}</p>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('DELEGATION_EFFICIENCY')}</p>
        <p className="color-primary text-md">{formatPercent(metric?.delegationEfficiency || '0')}</p>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('DELEGATION_SATURATION')}</p>
        <p className="color-primary text-md">
          <ProgressBar value={metric?.delegationSaturation || '0'} />
        </p>
      </div>
    </StyledWrapper>
  );
}

export default DelegationInfo;
