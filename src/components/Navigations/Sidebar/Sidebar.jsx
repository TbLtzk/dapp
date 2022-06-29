import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoImg from 'components/Base/LogoImg';

import useFeatureFlag from 'hooks/useFeatureFlag';

import AccordionLinks from './components/AccordionLinks';
import CommonLinks from './components/CommonLinks';
import EcosystemApps from './components/EcosystemApps';
import Policy from './components/Policy';
import References from './components/References';
import Version from './components/Version';
import { FooterContaier, SidebarContainer, WrapLogo } from './styles';

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

  return (
    <SidebarContainer>
      <WrapLogo>
        <Link to="/">
          <LogoImg />
        </Link>
      </WrapLogo>

      <div className="sidebar_group">
        <div className="sidebar_links">
          <AccordionLinks type="dashboard-toggle" headerLink={<CommonLinks linkTo="/" linkTitle={t('DASHBOARD')} />}>
            <CommonLinks linkTo="/monitoring" linkTitle={`- ${t('MONITORING')}`} />
          </AccordionLinks>

          <CommonLinks
            exact={false}
            linkTo="/governance"
            linkTitle={t('GOVERNANCE')}
            count={activeProposalsCount}
          />
          <CommonLinks linkTo="/q-vault" linkTitle="Q Vault" />

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

          <CommonLinks linkTo="/saving-and-borrowing" linkTitle={t('SAVING_BORROWING')} />

          <AccordionLinks
            type="auctions-toggle"
            headerLink={<CommonLinks
              type="accordion"
              linkTo="/liquidation"
              linkTitle={t('DECENTRALIZED_AUCTIONS')}
            />}
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
          <CommonLinks linkTo="/time-locks" linkTitle={t('TIME_LOCKS')} />
        </div>

        <div className="divider" />
        <References />
        <div className="divider" />

        <EcosystemApps />
      </div>

      <FooterContaier>
        <Version />
        <Policy />
      </FooterContaier>
    </SidebarContainer>
  );
}

export default Sidebar;
