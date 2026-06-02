import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import { L0RootListItem } from '@q-dev/q-js-sdk';
import { ErrorHandler } from 'helpers';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';

import { StyledWrapper } from './styles';

import { useWeb3Context } from 'context/Web3ContextProvider';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { getRootNodesL0 } from 'helpers/root-node-metrics';

import { RoutePaths } from 'constants/routes';

type L0GovernanceEligibilityStatus =
  | 'loading'
  | 'disconnected'
  | 'wrong-network'
  | 'eligible-root'
  | 'eligible-alias'
  | 'read-only'
  | 'unknown-alias';

function L0Governance () {
  const { t } = useTranslation();
  const { address, isConnected, isRightNetwork } = useWeb3Context();
  const { indexerUrl } = useNetworkConfig();
  const [isL0ActiveLoading, setIsL0ActiveLoading] = useState(true);
  const [rootNodesL0Active, setRootNodesL0Active] = useState<L0RootListItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRootNodesL0Active () {
      setIsL0ActiveLoading(true);

      try {
        const activeList = await getRootNodesL0(indexerUrl, 'active');
        if (!isMounted) return;
        setRootNodesL0Active(activeList);
      } catch (error) {
        if (!isMounted) return;
        setRootNodesL0Active(null);
        ErrorHandler.processWithoutFeedback(error);
      } finally {
        if (isMounted) {
          setIsL0ActiveLoading(false);
        }
      }
    }

    loadRootNodesL0Active();
    return () => {
      isMounted = false;
    };
  }, [indexerUrl]);

  const l0GovernanceEligibility = useMemo(() => {
    if (!isConnected || !address) return { status: 'disconnected' as L0GovernanceEligibilityStatus };
    if (!isRightNetwork) return { status: 'wrong-network' as L0GovernanceEligibilityStatus };
    if (isL0ActiveLoading) return { status: 'loading' as L0GovernanceEligibilityStatus };

    const normalizedAddress = address.toLowerCase();
    const activeRoots = rootNodesL0Active?.roots || [];
    const matchedRoot = activeRoots.find(({ mainAccount }) => mainAccount?.toLowerCase() === normalizedAddress);

    if (matchedRoot) {
      return {
        status: 'eligible-root' as L0GovernanceEligibilityStatus,
        rootAccount: matchedRoot.mainAccount,
        aliasAccount: matchedRoot.aliasAccount || null
      };
    }

    const matchedAlias = activeRoots.find(({ aliasAccount }) => aliasAccount?.toLowerCase() === normalizedAddress);
    if (matchedAlias) {
      if (!matchedAlias.aliasAccount) {
        return {
          status: 'unknown-alias' as L0GovernanceEligibilityStatus,
          rootAccount: matchedAlias.mainAccount
        };
      }

      return {
        status: 'eligible-alias' as L0GovernanceEligibilityStatus,
        rootAccount: matchedAlias.mainAccount,
        aliasAccount: matchedAlias.aliasAccount
      };
    }

    return { status: 'read-only' as L0GovernanceEligibilityStatus };
  }, [address, isConnected, isRightNetwork, isL0ActiveLoading, rootNodesL0Active]);

  const eligibilityContent = useMemo(() => {
    switch (l0GovernanceEligibility.status) {
      case 'loading':
        return t('L0_ELIGIBILITY_LOADING');
      case 'disconnected':
        return t('L0_ELIGIBILITY_DISCONNECTED');
      case 'wrong-network':
        return t('L0_ELIGIBILITY_WRONG_NETWORK');
      case 'eligible-root':
        return t('L0_ELIGIBILITY_ELIGIBLE_ROOT', {
          account: l0GovernanceEligibility.rootAccount
        });
      case 'eligible-alias':
        return t('L0_ELIGIBILITY_ELIGIBLE_ALIAS', {
          alias: l0GovernanceEligibility.aliasAccount,
          root: l0GovernanceEligibility.rootAccount
        });
      case 'unknown-alias':
        return t('L0_ELIGIBILITY_UNKNOWN_ALIAS');
      case 'read-only':
      default:
        return t('L0_ELIGIBILITY_READ_ONLY');
    }
  }, [l0GovernanceEligibility, t]);

  const isEligibleForSigning = (
    l0GovernanceEligibility.status === 'eligible-root' ||
    l0GovernanceEligibility.status === 'eligible-alias'
  );

  return (
    <PageLayout title={t('L0_GOVERNANCE')}>
      <StyledWrapper>
        <section className="l0-governance__hero block">
          <p className="l0-governance__eyebrow text-md font-semibold color-primary">
            {t('L0_GOVERNANCE')}
          </p>
          <h2 className="l0-governance__title text-h2">
            {t('L0_GOVERNANCE_LANDING_TITLE')}
          </h2>
          <p className="l0-governance__description text-lg color-secondary">
            {t('L0_GOVERNANCE_LANDING_DESCRIPTION')}
          </p>
          <div className="l0-governance__eligibility block">
            <h3 className="text-h4">{t('L0_ELIGIBILITY_TITLE')}</h3>
            <p className="text-md color-secondary">
              {eligibilityContent}
            </p>
          </div>
          <Link to={RoutePaths.dashboardRootNodesMonitoring}>
            <Button
              alwaysEnabled
              className="l0-governance__monitoring-link"
            >
              <Icon name="chevron-right" />
              <span>{t('OPEN_L0_MONITORING')}</span>
            </Button>
          </Link>
        </section>

        <section className="l0-governance__cards">
          <article className="l0-governance__card block">
            <h3 className="text-h3">{t('ROOT_LIST_GOVERNANCE')}</h3>
            <p className="text-md color-secondary">
              {t('ROOT_LIST_GOVERNANCE_DESCRIPTION')}
            </p>
            <Button alwaysEnabled={isEligibleForSigning} disabled={!isEligibleForSigning}>
              {t('L0_SIGNING_COMING_SOON')}
            </Button>
          </article>

          <article className="l0-governance__card block">
            <h3 className="text-h3">{t('VALIDATOR_EXCLUSION_GOVERNANCE')}</h3>
            <p className="text-md color-secondary">
              {t('VALIDATOR_EXCLUSION_GOVERNANCE_DESCRIPTION')}
            </p>
            <Button alwaysEnabled={isEligibleForSigning} disabled={!isEligibleForSigning}>
              {t('L0_SIGNING_COMING_SOON')}
            </Button>
          </article>
        </section>
      </StyledWrapper>
    </PageLayout>
  );
}

export default L0Governance;
