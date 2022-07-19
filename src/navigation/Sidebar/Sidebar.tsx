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

import { activeAuctionsCountSelector } from 'store/auctions/selectors';
import { activeProposalsCountSelector } from 'store/voting/proposals/selectors';

function Sidebar () {
  const { t } = useTranslation();
  const isAliasesEnabled = useFeatureFlag('aliases');

  const activeProposalsCount = useSelector(activeProposalsCountSelector);
  const activeAuctionsCount = useSelector(activeAuctionsCountSelector);

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
              exact={false}
              to="/governance"
              title={t('GOVERNANCE')}
              icon="vote"
              count={activeProposalsCount}
            />
            <SidebarLink
              exact={false}
              to="/q-vault"
              title={t('Q_VAULT')}
              icon="wallet"
            />

            <SidebarLink
              exact={false}
              to="/staking"
              title={t('STAKING')}
              icon="stake"
            />

            {isAliasesEnabled && <SidebarLink
              icon="handshake"
              to="/account-aliasing"
              title={t('ACCOUNT_ALIASING')}
            />}

            <SidebarLink
              to="/saving-and-borrowing"
              title={t('SAVING_BORROWING')}
              icon="coins"
            />

            <SidebarLink
              exact={false}
              to="/auctions"
              title={t('DECENTRALIZED_AUCTIONS')}
              icon="hammer"
              count={activeAuctionsCount}
            />

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
        <button className="sidebar-footer-link text-md" onClick={() => setVersionModalOpen(true)}>
          {packageJson.version}
        </button>

        <Link to="/data-privacy" className="sidebar-footer-link text-md">
          {t('DATA_PRIVACY')}
        </Link>

        <Link to="/imprint" className="sidebar-footer-link text-md">
          {t('IMPRINT')}
        </Link>
      </div>

      <VersionModal open={versionModalOpen} onClose={() => setVersionModalOpen(false)} />
    </SidebarContainer>
  );
}

export default Sidebar;
