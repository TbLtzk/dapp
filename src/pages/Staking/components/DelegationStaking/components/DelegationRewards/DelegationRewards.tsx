import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { getOutstandingDelegationRewards, onClaimStakeDelegatorReward } from 'store/q-vault/action-creators';
import { outstandingDelegationRewards } from 'store/q-vault/selectors';

import { fN } from 'func/useful';

function DelegationRewards () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const outstandingDelegationRewardsValue = useSelector(outstandingDelegationRewards);

  useEffect(() => {
    dispatch(getOutstandingDelegationRewards());
  }, [dispatch]);

  function handleClaim () {
    dispatch(onClaimStakeDelegatorReward(t('ON_OUTSTANDING_DELEGATION_REWARDS_SUCCESS')));
  }

  return (
    <div className="delegation-reward_container">
      <div>
        <p className="text-md">{t('OUTSTANDING_DELEGATION_REWARDS')}</p>
        <h4 className="text-xl">{`${fN(outstandingDelegationRewardsValue)} Q`}</h4>
      </div>
      <Button onClick={handleClaim}>
        <Icon name="coins" />
        <span>{t('CLAIM_DELEGATION_REWARD')}</span>
      </Button>
    </div>
  );
}

export default DelegationRewards;
