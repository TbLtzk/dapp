import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';

import LockForm from './components/LockForm';
import UnlockForm from './components/UnlockForm';

function LockCoin () {
  return (
    <CustomBlock>
      <h1>Lock Your Q Tokens for Voting</h1>
      <h5 style={{ marginBottom: '15px' }}>
        Participate in Q Governance with your Locked Amount
      </h5>
      <LockForm />
      <UnlockForm />
      <div className="card__actions">
        <Link to="/q-governance">
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
          />
        </Link>
      </div>
    </CustomBlock>
  );
}

export default LockCoin;
