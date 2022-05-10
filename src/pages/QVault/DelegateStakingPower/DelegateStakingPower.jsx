import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import DelegatedValidatorsPanel from 'components/Custom/MembersPanel/DelegatedValidatorsPanel';

import DelegationRewards from './DelegationRewards';
import UpdateDelegation from './UpdateDelegation';

const DelegateStakingPower = () =>
  (
    <>
      <CustomBlock>
        <h1>Delegate Staking Power</h1>
        <DelegationRewards />
        <div className="card__line" />
        <UpdateDelegation />
      </CustomBlock>
      <CustomBlock>
        <DelegatedValidatorsPanel />
      </CustomBlock>
    </>
  );

export default DelegateStakingPower;
