import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Tip from 'ui/Tip';

import { delegationStakeInfoSelector } from 'store/q-vault/selectors';

function ClaimTip () {
  const { t } = useTranslation();

  const delegationStakeInfo = useSelector(delegationStakeInfoSelector);

  if (Number(delegationStakeInfo?.totalStakeReward ?? 0) > 0) {
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
