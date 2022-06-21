import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { MODE } from 'components/Navigations/Header/components/Settings/components/DashboardModeSwitcher/DashboardModeSwitcher';

import useFeatureFlag from 'hooks/useFeatureFlag';

import AccordionLinks from './components/AccordionLinks';
import CommonLinks from './components/CommonLinks';
import Policy from './components/Policy';
import References from './components/References';
import Version from './components/Version';
import { FooterContainer, FooterDataContaier, SidebarContainer } from './styles';

import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector,
} from 'store/auctions/selectors';
import { mode } from 'store/dashboard-mode/selectors';
import { contractUpdatesActiveProposalsCountSelector } from 'store/voting/contract-updates/selectors';
import { expertActiveProposalsCountSelector } from 'store/voting/expert-proposals/selectors';
import { qActiveProposalsCountSelector } from 'store/voting/q-proposals/selectors';
import { rootActiveProposalsCountSelector } from 'store/voting/root-node-proposals/selectors';
import { slashingActiveProposalsCountSelector } from 'store/voting/slashing-proposals/selectors';

function Sidebar () {
  const { t } = useTranslation();
  const appMode = useSelector(mode);
  const isAliasesEnabled = useFeatureFlag('aliases');

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector);
  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector);
  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector);
  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector);
  const contractUpdatesActiveProposalsCount = useSelector(contractUpdatesActiveProposalsCountSelector);

  const liquidationAuctions = useSelector(liquidationAuctionsSelector);
  const liquidationActiveAuctionsCount = liquidationAuctions?.activeAuctions?.length;

  const systemDebtAuctions = useSelector(systemDebtAuctionsSelector);
  const systemDebtActiveAuctionsCount = systemDebtAuctions?.activeAuctions?.length;

  const systemSurplusAuction = useSelector(systemSurplusAuctionsSelector);
  const systemSurplusActiveAuctionsCount = systemSurplusAuction?.activeAuctions?.length;

  const dashboard = <CommonLinks
    linkTo="/"
    linkTitle={t('DASHBOARD')}
  />;

  return (
    <SidebarContainer>
      <div className="sidebar_container">

        <div className="sidebar_links">
          {appMode === MODE.advanced
            ? (
              <AccordionLinks type="dashboard-toggle" headerLink={dashboard}>
                <CommonLinks linkTo="/monitoring" linkTitle={t('MONITORING')} />
              </AccordionLinks>
            )
            : (
              dashboard
            )}

          <AccordionLinks
            type="governance-toggle"
            headerLink={<CommonLinks linkTo="/q-governance" linkTitle={t('GOVERNANCE')} />}
          >
            <>
              <CommonLinks
                linkTo="/q-proposals"
                count={qActiveProposalsCount}
                linkTitle={t('Q_PROPOSALS')}
              />

              <CommonLinks
                linkTo="/q-root-node-panel"
                count={rootActiveProposalsCount}
                linkTitle={t('ROOT_NODE_PANEL')}
              />

              {appMode === MODE.advanced
                ? (
                  <>
                    <CommonLinks
                      linkTo="/q-expert-proposals"
                      count={expertActiveProposalsCount}
                      linkTitle={t('EXPERT_PROPOSALS')}
                    />
                    <CommonLinks
                      linkTo="/slashing-proposals"
                      count={slashingActiveProposalsCount}
                      linkTitle={t('SLASHING_PROPOSALS')}
                    />
                    <CommonLinks
                      linkTo="/contract-updates"
                      count={contractUpdatesActiveProposalsCount}
                      linkTitle={t('CONTRACT_UPDATES')}
                    />
                  </>
                )
                : null}
            </>
          </AccordionLinks>

          <CommonLinks linkTo="/q-vault" linkTitle={t('Q_VAULT')} />

          {appMode === MODE.advanced
            ? (
              <AccordionLinks
                type="consensus-toggle"
                headerLink={
                  <CommonLinks
                    type="accordion"
                    linkTo="/root-node-staking"
                    linkTitle={t('CONSENSUS_SERVICES')}
                  />
                }
              >
                <>
                  <CommonLinks linkTo="/root-node-staking" linkTitle={t('ROOT_NODE_STAKING')} />
                  <CommonLinks linkTo="/validator-staking" linkTitle={t('VALIDATOR_STAKING')} />
                  {isAliasesEnabled && <CommonLinks linkTo="/account-aliasing" linkTitle={t('ACCOUNT_ALIASING')} />}
                </>
              </AccordionLinks>
            )
            : null}
          <CommonLinks linkTo="/saving-and-borrowing" linkTitle={t('SAVING_BORROWING')} />
          {appMode === MODE.advanced
            ? (
              <>
                <AccordionLinks
                  type="auctions-toggle"
                  headerLink={
                    <CommonLinks
                      type="accordion"
                      linkTo="/liquidation"
                      linkTitle={t('DECENTRALIZED_AUCTIONS')}
                    />
                  }
                >
                  <>
                    <CommonLinks
                      linkTo="/liquidation"
                      count={liquidationActiveAuctionsCount}
                      linkTitle={t('LIQUIDATION')}
                    />

                    <CommonLinks
                      linkTo="/system-debt"
                      count={systemDebtActiveAuctionsCount}
                      linkTitle={t('SYSTEM_DEBT')}
                    />

                    <CommonLinks
                      linkTo="/system-surplus"
                      count={systemSurplusActiveAuctionsCount}
                      linkTitle={t('SYSTEM_SURPLUS')}
                    />
                  </>
                </AccordionLinks>
                <CommonLinks
                  linkTo="/time-locks"
                  linkTitle={t('TIME_LOCKS')}
                />
              </>
            )
            : null}
        </div>
        <FooterContainer>
          <References />

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
