import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from 'assets/img/logo.png';

import useFeatureFlag from 'hooks/useFeatureFlag';

import packageJson from '../../../package.json';

import EcosystemLinks from './components/EcosystemLinks';
import References from './components/References/References';
import SidebarLink from './components/SidebarLink/SidebarLink';
import VersionModal from './components/VersionModal';
import { SidebarContainer } from './styles';

import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector,
} from 'store/auctions/selectors';
import { activeProposalsCountSelector } from 'store/voting/proposals/selectors';

function Sidebar () {
  const { t } = useTranslation();
  const isAliasesEnabled = useFeatureFlag('aliases');

  const activeProposalsCount = useSelector(activeProposalsCountSelector);

  const liquidationAuctions = useSelector(liquidationAuctionsSelector);
  const liquidationActiveAuctionsCount = liquidationAuctions?.activeAuctions?.length;

  const systemDebtAuctions = useSelector(systemDebtAuctionsSelector);
  const systemDebtActiveAuctionsCount = systemDebtAuctions?.activeAuctions?.length;

  const systemSurplusAuction = useSelector(systemSurplusAuctionsSelector);
  const systemSurplusActiveAuctionsCount = systemSurplusAuction?.activeAuctions?.length;

  const [versionModalOpen, setVersionModalOpen] = useState(false);

  return (
    <SidebarContainer>
      <div className="sidebar-content">
        <Link to="/" className="sidebar-logo-link">
          <img
            className="sidebar-logo"
            alt="Q Logo"
            src={logo}
          />
        </Link>

        <div className="sidebar-main">
          <div className="sidebar-links">
            <SidebarLink
              to="/"
              title={t('DASHBOARD')}
              icon="dashboard"
            />

            <SidebarLink
              to="/q-vault"
              title="Q Vault"
              icon="wallet"
            />

            <SidebarLink
              exact={false}
              to="/governance"
              title={t('GOVERNANCE')}
              icon="vote"
              count={activeProposalsCount}
            />

            <SidebarLink
              accordion
              to="/root-node-staking"
              title={t('CONSENSUS_SERVICES')}
              icon="bank"
            >
              <SidebarLink
                to="/root-node-staking"
                title={t('ROOT_NODE_STAKING')}
              />
              <SidebarLink
                to="/validator-staking"
                title={t('VALIDATOR_STAKING')}
              />
              {isAliasesEnabled && <SidebarLink
                to="/account-aliasing"
                title={t('ACCOUNT_ALIASING')}
              />}
            </SidebarLink>

            <SidebarLink
              to="/saving-and-borrowing"
              title={t('SAVING_BORROWING')}
              icon="coins"
            />

            <SidebarLink
              accordion
              to="/liquidation"
              title={t('DECENTRALIZED_AUCTIONS')}
              icon="hammer"
            >
              <SidebarLink
                to="/liquidation"
                count={liquidationActiveAuctionsCount}
                title={t('LIQUIDATION')}
              />

              <SidebarLink
                to="/system-debt"
                count={systemDebtActiveAuctionsCount}
                title={t('SYSTEM_DEBT')}
              />

              <SidebarLink
                to="/system-surplus"
                count={systemSurplusActiveAuctionsCount}
                title={t('SYSTEM_SURPLUS')}
              />
            </SidebarLink>

            <SidebarLink
              to="/time-locks"
              title={t('TIME_LOCKS')}
              icon="clock"
            />
          </div>

          <References />
          <EcosystemLinks />
        </div>
      </div>

      <div className="sidebar-footer">
        <button
          className="sidebar-footer-link text-md"
          onClick={() => setVersionModalOpen(true)}
        >
          {packageJson.version}
        </button>

        <Link
          to="/data-privacy"
          className="sidebar-footer-link text-md"
        >
          {t('DATA_PRIVACY')}
        </Link>

        <Link
          to="/imprint"
          className="sidebar-footer-link text-md"
        >
          {t('IMPRINT')}
        </Link>
      </div>

      <VersionModal
        open={versionModalOpen}
        onClose={() => setVersionModalOpen(false)}
      />
    </SidebarContainer>
  );
}

export default Sidebar;
