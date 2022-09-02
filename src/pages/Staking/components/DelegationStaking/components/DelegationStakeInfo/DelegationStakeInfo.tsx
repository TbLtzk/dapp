import { useTranslation } from 'react-i18next';

import TopUpQVault from 'components/TopUpQVault';

import { useQVault } from 'store/q-vault/hooks';

import { formatAsset } from 'utils/numbers';

function DelegationStakeInfo () {
  const { t } = useTranslation();
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
          <span>{delegationStakeInfoLoading ? '... Q' : formatAsset(delegationStakeInfo?.delegatableAmount, 'Q')}</span>
          <TopUpQVault onSubmit={() => loadDelegationStakeInfo()} />
        </div>
      </div>

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('TOTAL_DELEGATED_STAKE')}</p>
        <p className="text-xl font-semibold">{delegationStakeInfoLoading ? '... Q' : formatAsset(delegationStakeInfo.totalDelegatedStake, 'Q')}</p>
      </div>

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('DELEGATION_REWARD')}</p>
        <p className="text-xl font-semibold">{delegationStakeInfoLoading ? '... Q' : formatAsset(delegationStakeInfo.totalStakeReward, 'Q')}</p>
      </div>

    </div>
  );
}

export default DelegationStakeInfo;
