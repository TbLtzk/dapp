import React from 'react';
import { useHistory } from 'react-router';

import Button from 'components/Base/Buttons/Button';
import CustomBlock from 'components/Base/CustomBlock';

import LockForm from './components/LockForm';
import UnlockForm from './components/UnlockForm';

function LockCoin () {
  const history = useHistory();

  return (
    <CustomBlock>
      <h1>Lock Your Q Tokens for Voting</h1>
      <h5 style={{ marginBottom: '15px' }}>
        Participate in Q Governance with your Locked Amount
      </h5>
      <div style={{ display: 'grid', gap: '15px' }}>
        <LockForm />
        <UnlockForm />
      </div>
      <div className="card__actions">
        <Button
          alwaysEnabled
          type="transparent"
          title={
            <>
              <span style={{ marginRight: '5px' }}>
                Go to Governance
              </span>
              <i className="mdi mdi-arrow-right" />
            </>
          }
          handleButton={() =>
            history.push({ pathname: '/q-governance' })
          }
        />
      </div>
    </CustomBlock>
  );
}

export default LockCoin;
