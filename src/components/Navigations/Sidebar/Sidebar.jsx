import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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
import { activeProposalsCountSelector } from 'store/voting/proposals/selectors';

import { MODE } from 'constants/config';

function Sidebar () {
  const { t } = useTranslation();
  const appMode = useSelector(mode);
  const isAliasesEnabled = useFeatureFlag('aliases');

  const activeProposalsCount = useSelector(activeProposalsCountSelector);

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
                <CommonLinks linkTo="/monitoring" linkTitle={`- ${t('MONITORING')}`} />
              </AccordionLinks>
            )
            : (
              dashboard
            )}

          <CommonLinks
            exact={false}
            linkTo="/governance"
            linkTitle={t('GOVERNANCE')}
            count={activeProposalsCount}
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
                    linkTitle={t('CONSENSUS_SERVICES')}
                  />
                }
              >
                <>
                  <CommonLinks linkTo="/root-node-staking" linkTitle={`- ${t('ROOT_NODE_STAKING')}`} />
                  <CommonLinks linkTo="/validator-staking" linkTitle={`- ${t('VALIDATOR_STAKING')}`} />
                  {isAliasesEnabled && <CommonLinks linkTo="/account-aliasing" linkTitle={`- ${t('ACCOUNT_ALIASING')}`} />}
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
                      linkTitle={`- ${t('LIQUIDATION')}`}
                    />

                    <CommonLinks
                      linkTo="/system-debt"
                      count={systemDebtActiveAuctionsCount}
                      linkTitle={`- ${t('SYSTEM_DEBT')}`}
                    />

                    <CommonLinks
                      linkTo="/system-surplus"
                      count={systemSurplusActiveAuctionsCount}
                      linkTitle={`- ${t('SYSTEM_SURPLUS')}`}
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
