import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import { useInterval } from '@q-dev/react-hooks';
import { formatNumberCompact } from '@q-dev/utils';
import { motion } from 'framer-motion';

import Button from 'components/Button';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { BalanceDropdown, QLogo } from './styles';

import { useBaseVotingWeightInfo } from 'store/proposals/hooks';
import { useQVault } from 'store/q-vault/hooks';

import { RoutePaths } from 'constants/routes';
import { fromWei } from 'utils/web3';

function Balance () {
  const { t } = useTranslation();
  const { baseVotingWeightInfo } = useBaseVotingWeightInfo();
  const { qTicker } = useNetworkConfig();
  const totalVotingWeight = fromWei(baseVotingWeightInfo.ownWeight);
  const { vaultBalance, walletBalance, loadAllBalances } = useQVault();

  useInterval(loadAllBalances, 5000);

  const [balanceOpen, setBalanceOpen] = useState(false);

  return (
    <BalanceDropdown
      right
      open={balanceOpen}
      trigger={
        <Button alwaysEnabled look="secondary">
          <div className="balance">
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(walletBalance, 2)} {qTicker}</p>
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
            <QLogo width={28} margin="0 5px 0 0">
              <img src="/logo.png" alt="q" />
            </QLogo>
            <p className="text-lg color-secondary">{t('BALANCE')}</p>
          </div>
          <p className="text-xl color-primary font-semibold">{formatNumberCompact(walletBalance, 2)}</p>
        </div>

        <Link to={RoutePaths.qVault}>
          <div className="balance balance-action">
            <p className="text-md color-secondary">{t('Q_VAULT_BALANCE')} </p>
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(vaultBalance, 2)}</p>
          </div>
        </Link>

        <Link to={RoutePaths.governance}>
          <div className="balance balance-action">
            <p className="text-md color-secondary">{t('VOTING_WEIGHT')}</p>
            <p className="text-lg color-primary font-semibold">{formatNumberCompact(totalVotingWeight, 2)}</p>
          </div>
        </Link>
      </div>
    </BalanceDropdown>
  );
}

export default Balance;
