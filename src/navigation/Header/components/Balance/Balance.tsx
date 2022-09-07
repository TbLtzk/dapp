import { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { fromWei } from 'web3-utils';

import Button from 'components/Button';
import Icon from 'ui/Icon';

import { BalanceDropdown, QLogo } from './styles';

import { useBaseVotingWeightInfo } from 'store/proposals/hooks';
import { useQVault } from 'store/q-vault/hooks';

import { RoutePaths } from 'constants/routes';
import { formatNumberCompact } from 'utils/numbers';

function Balance () {
  const { baseVotingWeightInfo } = useBaseVotingWeightInfo();
  const totalVotingWeight = fromWei(baseVotingWeightInfo.ownWeight);
  const { vaultBalance, walletBalance } = useQVault();

  const [balanceOpen, setBalanceOpen] = useState(false);

  return (
    <BalanceDropdown
      right
      open={balanceOpen}
      trigger={
        <Button alwaysEnabled look="secondary">
          <div className="balance">
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(walletBalance)}</p>
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
          <p className="text-xl color-primary font-semibold">{formatNumberCompact(walletBalance)}</p>
        </div>

        <Link to={RoutePaths.qVault}>
          <div className="balance balance-action">
            <p className="text-md color-secondary">Q Vault Balance </p>
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(vaultBalance)}</p>
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
