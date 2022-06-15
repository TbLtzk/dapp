import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DashboardMode from 'components/Base/DashboardMode';
import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import Themes from 'components/Base/Themes';

import useFeatureFlag from 'hooks/useFeatureFlag';
import useWindowSize from 'hooks/useWindowSize';

import AccordionElements from './components/AccordionElements';
import AccordionLinks from './components/AccordionLinks';
import CommonLinks from './components/CommonLinks';
import Policy from './components/Policy';
import References from './components/References';
import ToggleSidebar from './components/ToggleSidebar';
import Version from './components/Version';
import { FooterContainer, FooterDataContaier, SidebarContainer } from './styles';

import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector
} from 'store/auctions/selectors';
import { mode } from 'store/dashboard-mode/selectors';

function Sidebar () {
  const appMode = useSelector(mode);
  const windowSize = useWindowSize();
  const isAliasesEnabled = useFeatureFlag('aliases');

  const liquidationAuctions = useSelector(liquidationAuctionsSelector);
  const liquidationActiveAuctionsCount = liquidationAuctions?.activeAuctions?.length;

  const systemDebtAuctions = useSelector(systemDebtAuctionsSelector);
  const systemDebtActiveAuctionsCount = systemDebtAuctions?.activeAuctions?.length;

  const systemSurplusAuction = useSelector(systemSurplusAuctionsSelector);
  const systemSurplusActiveAuctionsCount = systemSurplusAuction?.activeAuctions?.length;

  const [openSidebar, setOpenSidebar] = useState(localStorage.getItem('sidebar-toggle') ? '' : '0');

  useEffect(() => {
    if (windowSize.width < 700) {
      setOpenSidebar('');
    }
  }, [windowSize.width]);

  const dashboard = <CommonLinks
    openSidebar={openSidebar}
    linkTo="/"
    linkTitle="Dashboard"
  />;

  return (
    <SidebarContainer openSidebar={openSidebar}>
      <div className="sidebar_container">
        <i className="mdi mdi-chevron-right" />
        <div className="sidebar_links">
          {appMode === MODE.advanced
            ? (
              <AccordionLinks type="dashboard-toggle" headerLink={dashboard}>
                <CommonLinks linkTo="/monitoring" linkTitle="– Monitoring" />
              </AccordionLinks>
            )
            : (
              dashboard
            )}

          <CommonLinks
            exact={false}
            linkTo="/governance"
            linkTitle="Governance"
          />
          <CommonLinks linkTo="/q-vault" linkTitle="Q Vault" />

          {appMode === MODE.advanced
            ? (
              <AccordionLinks
                type="consensus-toggle"
                headerLink={
                  <CommonLinks
                    type="accordion"
                    linkTo="/root-node-staking"
                    linkTitle="Consensus Services"
                  />
                }
              >
                <>
                  <CommonLinks linkTo="/root-node-staking" linkTitle="– Root Node Staking" />
                  <CommonLinks linkTo="/validator-staking" linkTitle="– Validator Staking" />
                  {isAliasesEnabled && (
                    <CommonLinks linkTo="/account-aliasing" linkTitle="– Account Aliasing" />
                  )}
                </>
              </AccordionLinks>
            )
            : null}
          <CommonLinks linkTo="/saving-and-borrowing" linkTitle="Saving & Borrowing" />
          {appMode === MODE.advanced
            ? (
              <>
                <AccordionLinks
                  type="auctions-toggle"
                  headerLink={
                    <CommonLinks
                      type="accordion"
                      linkTo="/liquidation"
                      linkTitle="Decentralized Auctions"
                    />
                  }
                >
                  <>
                    <CommonLinks
                      linkTo="/liquidation"
                      count={liquidationActiveAuctionsCount}
                      linkTitle="– Liquidation"
                    />

                    <CommonLinks
                      linkTo="/system-debt"
                      count={systemDebtActiveAuctionsCount}
                      linkTitle="– System Debt"
                    />

                    <CommonLinks
                      linkTo="/system-surplus"
                      count={systemSurplusActiveAuctionsCount}
                      linkTitle="– System Surplus"
                    />
                  </>
                </AccordionLinks>
                <CommonLinks
                  openSidebar={openSidebar}
                  linkTo="/time-locks"
                  linkTitle="Time Locks"
                />
              </>
            )
            : null}
        </div>
        <FooterContainer>
          <References />

          <AccordionElements title="Settings" margin="24px 0 24px 0">
            <div style={{ display: 'grid', gap: '8px', marginTop: '8px' }}>
              <DashboardMode />
              <Themes />
              <ToggleSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            </div>
          </AccordionElements>

          <FooterDataContaier>
            <Version />
            <Policy />
          </FooterDataContaier>

        </FooterContainer>
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;
