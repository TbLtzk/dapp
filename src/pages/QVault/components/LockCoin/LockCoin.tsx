import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import InfoTooltip from 'components/Custom/InfoTooltip';

import LockForm from './components/LockForm';

function LockCoin () {
  return (
    <div className="block">
      <div className="block__header">
        <h1 className="text-h3">
          <span>Lock Your Q Tokens for Voting</span>
          <InfoTooltip topic="lock-tokens-for-voting" />
        </h1>

        <Link to="/governance">
          <Button
            block
            compact
            alwaysEnabled
            look="ghost"
          >
            <span>Go to Governance</span>
            <i className="mdi mdi-arrow-right" />
          </Button>
        </Link>
      </div>

      <p
        className="text-md color-secondary"
        style={{ marginBottom: '16px' }}
      >
        Participate in Q Governance with your Locked Amount
      </p>

      <LockForm />
    </div>
  );
}

export default LockCoin;
