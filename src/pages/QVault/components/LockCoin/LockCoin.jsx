import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';

import LockForm from './components/LockForm';
import UnlockForm from './components/UnlockForm';

function LockCoin () {
  return (
    <CustomBlock>
      <h1>
        <span>Lock Your Q Tokens for Voting</span>
        <InfoTooltip topic="lock-tokens-for-voting" />
      </h1>
      <h5 style={{ marginBottom: '15px' }}>
        Participate in Q Governance with your Locked Amount
      </h5>
      <div style={{ display: 'grid', gap: '15px' }}>
        <LockForm />
        <UnlockForm />
      </div>
      <div className="card__actions">
        <Link to="/governance">
          <Button alwaysEnabled look="transparent">
            <span>Go to Governance</span>
            <i className="mdi mdi-arrow-right" />
          </Button>
        </Link>
      </div>
    </CustomBlock>
  );
}

export default LockCoin;
