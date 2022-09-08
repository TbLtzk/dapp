import { useTranslation } from 'react-i18next';

import { Tip } from '@q-dev/q-ui-kit';

import { useQVault } from 'store/q-vault/hooks';

function ClaimTip () {
  const { t } = useTranslation();
  const { delegationStakeInfo } = useQVault();

  if (Number(delegationStakeInfo.totalStakeReward) > 0) {
    return (
      <Tip
        compact
        type="warning"
        style={{ margin: '15px 0 0 0' }}
      >
        <p className="text-md">{t('DO_NOT_FORGET_CLAIM')}</p>
        <p className="text-md"></p>
      </Tip>
    );
  }
  return null;
}

export default ClaimTip;
