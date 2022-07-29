import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import InfoTooltip from 'components/Tooltips/InfoTooltip';

import LockForm from './components/LockForm';

function LockCoin () {
  const { t } = useTranslation();

  return (
    <div className="block">
      <div className="block__header" style={{ gap: 0 }}>
        <h1 className="text-h3">
          {t('LOCK_YOUR_Q_TOKENS_FOR_VOTING')}
          <InfoTooltip topic="lock-tokens-for-voting" />
        </h1>

        <Link to="/governance">
          <Button
            block
            compact
            alwaysEnabled
            look="ghost"
          >
            <span>{t('GO_TO_GOVERNANCE')}</span>
            <i className="mdi mdi-arrow-right" />
          </Button>
        </Link>
      </div>

      <p
        className="text-md color-secondary"
        style={{ marginBottom: '16px' }}
      >
        {t('PARTICIPATE_IN_Q_GOVERNANCE_WITH_YOUR_LOCKED_AMOUNT')}
      </p>

      <LockForm />
    </div>
  );
}

export default LockCoin;
