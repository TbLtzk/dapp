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

import { RoutePaths } from 'constants/routes';
import { formatNumberCompact } from 'utils/numbers';

function Balance () {
  const [balanceOpen, setBalanceOpen] = useState(false);

  const userWalletBalance = useSelector(accountBalance);
  const userQVaultBalance = useSelector(userBalance);

  const { ownWeight } = useSelector(baseVotingWeightInfoSelector);
  const totalVotingWeight = fromWei(ownWeight || '0');

  return (
    <BalanceDropdown
      right
      open={balanceOpen}
      trigger={
        <Button alwaysEnabled look="secondary">
          <div className="balance">
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(userWalletBalance)}</p>
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
            <p className="text-lg color-secondary">Balance</p>
          </div>
          <p className="text-xl color-primary font-semibold">{formatNumberCompact(userWalletBalance)}</p>
        </div>

        <Link to={RoutePaths.qVault}>
          <div className="balance balance-action">
            <p className="text-md color-secondary">Q Vault Balance </p>
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(userQVaultBalance)}</p>
          </div>
        </Link>

        <Link to={RoutePaths.governance}>
          <div className="balance balance-action">
            <p className="text-md color-secondary">Voting Weight</p>
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(totalVotingWeight)}</p>
          </div>
        </Link>
      </div>
    </BalanceDropdown>
  );
}

export default Balance;
