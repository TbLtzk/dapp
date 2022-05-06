import React from 'react';

import PageWrap from 'components/Base/PageWrap';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';

import ManageStakerRewardPool from './components/ManageStakerRewardPool';
import ManageValidatorBalance from './components/ManageValidatorBalance';

import TABLE_TYPES from 'constants/tableTypes';

function ValidatorStaking () {
  return (
    <PageWrap headerTitle="Validator Staking" headerExtra={<ManageStakerRewardPool />}>
      <ManageValidatorBalance />
      <ValidatorsPanel
        bottom
        buttons="q-vault"
        type="with-total"
        tableType={TABLE_TYPES.validatorsWidened}
      />
    </PageWrap>
  );
}

export default ValidatorStaking;
