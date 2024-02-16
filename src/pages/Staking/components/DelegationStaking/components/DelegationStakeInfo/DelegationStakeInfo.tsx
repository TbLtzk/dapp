import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';

import TopUpQVault from 'components/TopUpQVault';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useQVault } from 'store/q-vault/hooks';

function DelegationStakeInfo () {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();
  const {
    delegationStakeInfo,
    delegationStakeInfoLoading,
    loadDelegationStakeInfo
  } = useQVault();

  return (
    <div className="delegation-info_container">

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('MAX_AMOUNT_TO_DELEGATE')}</p>
        <div className="text-xl font-semibold">
          <span>{delegationStakeInfoLoading ? `... ${qTicker}` : formatAsset(delegationStakeInfo?.delegatableAmount, qTicker)}</span>
          <TopUpQVault onSubmit={() => loadDelegationStakeInfo()} />
        </div>
      </div>

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('TOTAL_DELEGATED_STAKE')}</p>
        <p className="text-xl font-semibold">{delegationStakeInfoLoading ? `... ${qTicker}` : formatAsset(delegationStakeInfo.totalDelegatedStake, qTicker)}</p>
      </div>

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('DELEGATION_REWARD')}</p>
        <p className="text-xl font-semibold">{delegationStakeInfoLoading ? `... ${qTicker}` : formatAsset(delegationStakeInfo.totalStakeReward, qTicker)}</p>
      </div>

    </div>
  );
}

export default DelegationStakeInfo;
