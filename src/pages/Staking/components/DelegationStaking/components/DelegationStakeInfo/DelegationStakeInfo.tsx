import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import TopUpQVault from 'components/TopUpQVault';

import { getDelegationStakeInfo } from 'store/q-vault/action-creators';
import { delegationStakeInfoSelector } from 'store/q-vault/selectors';

import { formatAsset } from 'utils/numbers';

function DelegationStakeInfo () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const delegationStakeInfo = useSelector(delegationStakeInfoSelector);
  const delegationStakeInfoLoading = isEmpty(delegationStakeInfo);

  return (
    <div className="delegation-info_container">

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('MAX_AMOUNT_TO_DELEGATE')}</p>
        <div className="text-xl font-semibold">
          <span>{delegationStakeInfoLoading ? '... Q' : formatAsset(delegationStakeInfo?.delegatableAmount, 'Q')}</span>
          <TopUpQVault onSubmit={() => dispatch(getDelegationStakeInfo())} />
        </div>
      </div>

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('TOTAL_DELEGATED_STAKE')}</p>
        <p className="text-xl font-semibold">{delegationStakeInfoLoading ? '... Q' : formatAsset(delegationStakeInfo?.totalDelegatedStake, 'Q')}</p>
      </div>

      <div className="delegation-item">
        <p className="color-secondary text-md">{t('DELEGATION_REWARD')}</p>
        <p className="text-xl font-semibold">{delegationStakeInfoLoading ? '... Q' : formatAsset(delegationStakeInfo?.totalStakeReward, 'Q')}</p>
      </div>

    </div>
  );
}

export default DelegationStakeInfo;
