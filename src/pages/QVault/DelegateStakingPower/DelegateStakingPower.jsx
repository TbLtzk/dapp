import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import DelegatedValidatorsPanel from 'components/Custom/MembersPanel/DelegatedValidatorsPanel';

import DelegationRewards from './DelegationRewards';
import UpdateDelegation from './UpdateDelegation';

export default function DelegateStakingPower () {
  return (
    <CustomBlock>
      <h1>Delegate Staking Power</h1>
      <DelegationRewards />
      <div className="card__line" />
      <UpdateDelegation />
      <DelegatedValidatorsPanel />
    </CustomBlock>
  );
}
