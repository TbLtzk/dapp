import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { BalanceDropdown, QLogo } from './styles';

import { accountBalance, userBalance } from 'store/q-vault/selectors';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

import { fNCompact } from 'utils/useful';

function Balance () {
  const [balanceOpen, setBalanceOpen] = useState(false);

  const userWalletBalance = fNCompact(useSelector(accountBalance));
  const userQVaultBalance = fNCompact(useSelector(userBalance));

  const { ownWeight } = useSelector(baseVotingWeightInfoSelector);
  const totalVotingWeight = fNCompact(fromWei(ownWeight || '0'));

  return (
    <BalanceDropdown
      right
      open={balanceOpen}
      trigger={
        <Button alwaysEnabled look="secondary">
          <div className="balance">
            <h5 className="text-lg color-primary font-semibold">{userWalletBalance}</h5>
            <QLogo width={22} margin="0 0 0 2px">
              <img src="/logo.png" alt="q" />
            </QLogo>
          </div>
          <motion.span
            style={{ height: '100%' }}
            animate={{
              rotate: balanceOpen ? 180 : 0,
            }}
          >
            <Icon name="expand-more" />
          </motion.span>
        </Button>
      }
      onToggle={setBalanceOpen}
    >
      <div className="balance-content">
        <div className="balance-q">
          <div className="balance">
            <QLogo width={30} margin="0 5px 0 0">
              <img src="/logo.png" alt="q" />
            </QLogo>
            <h5 className="text-lg color-secondary">Balance</h5>
          </div>
          <h5 className="text-xl color-primary font-semibold">{userWalletBalance}</h5>
        </div>

        <Link to="/q-vault">
          <div className="balance balance-action">
            <p className="text-md color-secondary">Q Vault Balance </p>
            <h6 className="text-lg color-primary font-semibold">{userQVaultBalance}</h6>
          </div>
        </Link>

        <Link to="/governance">
          <div className="balance balance-action">
            <p className="text-md color-secondary">Voting Weight</p>
            <h6 className="text-lg color-primary font-semibold">{totalVotingWeight}</h6>
          </div>
        </Link>
      </div>
    </BalanceDropdown>
  );
}

export default Balance;
