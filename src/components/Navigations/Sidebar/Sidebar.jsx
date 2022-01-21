import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { qActiveProposalsCountSelector } from 'store/voting/q-proposals/selectors'
import { rootActiveProposalsCountSelector } from 'store/voting/root-node-proposals/selectors'
import { expertActiveProposalsCountSelector } from 'store/voting/expert-proposals/selectors'
import { slashingActiveProposalsCountSelector } from 'store/voting/slashing-proposals/selectors'
import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector
} from 'store/auctions/selectors'

import LogoImg from 'components/Base/LogoImg'
import Version from './components/Version'

import { referencesItems } from './constants'

import {
  NavbarContainer,
  ListContainer,
  WrapLogo,
  ALinkStyle,
  LinksContainer,
  FooterContainer,
  Footer
} from './styles'
import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import CommonLinks from './components/CommonLinks'
import AccordionLinks from './components/AccordionLinks'
import DashboardMode from 'components/Base/DashboardMode'
import Themes from 'components/Base/Themes'
import AccordionElements from './components/AccordionElements'
import CopyAddress from './components/CopyAddress'
import { contractUpdatesActiveProposalsCountSelector } from 'store/voting/contract-updates/selectors'

function Sidebar () {
  const history = useHistory()
  const appMode = useSelector(mode)

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector)
  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector)
  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector)
  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector)
  const contractUpdatesActiveProposalsCount = useSelector(contractUpdatesActiveProposalsCountSelector)

  const liquidationAuctions = useSelector(liquidationAuctionsSelector)
  const liquidationActiveAuctionsCount = liquidationAuctions?.activeAuctions?.length

  const systemDebtAuctions = useSelector(systemDebtAuctionsSelector)
  const systemDebtActiveAuctionsCount = systemDebtAuctions?.activeAuctions?.length

  const systemSurplusAuction = useSelector(systemSurplusAuctionsSelector)
  const systemSurplusActiveAuctionsCount = systemSurplusAuction?.activeAuctions?.length

  const highlight = (location) => Number(history.location.pathname === '/' + location)
  const dashboard = <CommonLinks highlight={highlight('')} linkTo="/" linkTitle="Dashboard" />

  return (
        <header>
            <NavbarContainer expand="lg">
                <LinksContainer>
                    <WrapLogo>
                        <Link to="/">
                            <LogoImg />
                        </Link>
                    </WrapLogo>
                    <ListContainer id="basic-navbar-nav">
                        {appMode === MODE.advanced
                          ? (
                            <AccordionLinks headerLink={dashboard}>
                                <CommonLinks
                                    highlight={highlight('monitoring')}
                                    linkTo="/monitoring"
                                    linkTitle="– Monitoring"
                                />
                            </AccordionLinks>
                            )
                          : (
                              dashboard
                            )}

                        <AccordionLinks
                            headerLink={
                                <CommonLinks
                                    highlight={highlight('q-governance')}
                                    linkTo="/q-governance"
                                    linkTitle="Governance"
                                />
                            }
                        >
                            <div>
                                <CommonLinks
                                    highlight={highlight('q-proposals')}
                                    linkTo="/q-proposals"
                                    count={qActiveProposalsCount}
                                    linkTitle="– Q Proposals"
                                />

                                <CommonLinks
                                    highlight={highlight('q-root-node-panel')}
                                    linkTo="/q-root-node-panel"
                                    count={rootActiveProposalsCount}
                                    linkTitle="– Root Node Panel"
                                />

                                {appMode === MODE.advanced
                                  ? (
                                    <>
                                        <CommonLinks
                                            highlight={highlight('q-expert-proposals')}
                                            linkTo="/q-expert-proposals"
                                            count={expertActiveProposalsCount}
                                            linkTitle="– Expert Proposals"
                                        />
                                        <CommonLinks
                                            highlight={highlight('slashing-proposals')}
                                            linkTo="/slashing-proposals"
                                            count={slashingActiveProposalsCount}
                                            linkTitle="– Slashing Proposals"
                                        />
                                        <CommonLinks
                                            highlight={highlight('contract-updates')}
                                            linkTo="/contract-updates"
                                            count={contractUpdatesActiveProposalsCount}
                                            linkTitle="– Contract Updates"
                                        />
                                    </>
                                    )
                                  : null}
                            </div>
                        </AccordionLinks>

                        <CommonLinks highlight={highlight('q-vault')} linkTo="/q-vault" linkTitle="Q Vault" />

                        {appMode === MODE.advanced
                          ? (
                            <AccordionLinks
                                headerLink={<CommonLinks linkTo="/root-node-staking" linkTitle="Consensus Services" />}
                            >
                                <div>
                                    <CommonLinks
                                        highlight={highlight('root-node-staking')}
                                        linkTo="/root-node-staking"
                                        linkTitle="– Root Node Staking"
                                    />
                                    <CommonLinks
                                        highlight={highlight('validator-staking')}
                                        linkTo="/validator-staking"
                                        linkTitle="– Validator Staking"
                                    />
                                </div>
                            </AccordionLinks>
                            )
                          : null}
                        <CommonLinks
                            highlight={highlight('saving-and-borrowing')}
                            linkTo="/saving-and-borrowing"
                            linkTitle="Saving & Borrowing"
                        />
                        {appMode === MODE.advanced
                          ? (
                            <>
                                <AccordionLinks
                                    headerLink={
                                        <CommonLinks linkTo="/liquidation" linkTitle="Decentralized Auctions" />
                                    }
                                >
                                    <div>
                                        <CommonLinks
                                            highlight={highlight('liquidation')}
                                            linkTo="/liquidation"
                                            count={liquidationActiveAuctionsCount}
                                            linkTitle="– Liquidation"
                                        />

                                        <CommonLinks
                                            highlight={highlight('system-debt')}
                                            linkTo="/system-debt"
                                            count={systemDebtActiveAuctionsCount}
                                            linkTitle="– System Debt"
                                        />

                                        <CommonLinks
                                            highlight={highlight('system-surplus')}
                                            linkTo="/system-surplus"
                                            count={systemSurplusActiveAuctionsCount}
                                            linkTitle="– System Surplus"
                                        />
                                    </div>
                                </AccordionLinks>
                                <CommonLinks
                                    highlight={highlight('time-locks')}
                                    linkTo="/time-locks"
                                    linkTitle="Time Locks"
                                />
                            </>
                            )
                          : null}
                    </ListContainer>
                </LinksContainer>

                <FooterContainer>
                    <AccordionElements margin="24px 0 0 0" title="References">
                        {referencesItems.map((value, key) => (
                            <ALinkStyle
                                key={'references' + key}
                                className="nav-link"
                                href={value.location}
                                target="_blank"
                            >
                                {value.label}
                            </ALinkStyle>
                        ))}
                    </AccordionElements>

                    <AccordionElements margin="24px 0 24px 0" title="Settings">
                        <DashboardMode />
                        <Themes />
                    </AccordionElements>

                    <CopyAddress />
                    <Footer>
                        <Version />
                    </Footer>
                </FooterContainer>
            </NavbarContainer>
        </header>
  )
}

export default Sidebar
