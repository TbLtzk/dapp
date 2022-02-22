import React, { useState } from 'react'
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
import { contractUpdatesActiveProposalsCountSelector } from 'store/voting/contract-updates/selectors'
import { mode } from 'store/dashboard-mode/selectors'

import { MODE } from 'components/Base/DashboardMode/DashboardMode'
import CommonLinks from './components/CommonLinks'
import AccordionLinks from './components/AccordionLinks'
import DashboardMode from 'components/Base/DashboardMode'
import Themes from 'components/Base/Themes'
import AccordionElements from './components/AccordionElements'
import ToggleSidebar from './components/ToggleSidebar'
import Version from './components/Version'

import { ALinkStyle, FooterContainer, SidebarContainer } from './styles'
import { referencesItems } from './constants'

function Sidebar () {
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

  const [openSidebar, setOpenSidebar] = useState(localStorage.getItem('sidebar-toggle') ? '' : '0')

  const dashboard = <CommonLinks openSidebar={openSidebar} linkTo="/" linkTitle="Dashboard" />

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

                    <AccordionLinks
                        type="governance-toggle"
                        headerLink={<CommonLinks linkTo="/q-governance" linkTitle="Governance" />}
                    >
                        <>
                            <CommonLinks
                                linkTo="/q-proposals"
                                count={qActiveProposalsCount}
                                linkTitle="– Q Proposals"
                            />

                            <CommonLinks
                                linkTo="/q-root-node-panel"
                                count={rootActiveProposalsCount}
                                linkTitle="– Root Node Panel"
                            />

                            {appMode === MODE.advanced
                              ? (
                                <>
                                    <CommonLinks
                                        linkTo="/q-expert-proposals"
                                        count={expertActiveProposalsCount}
                                        linkTitle="– Expert Proposals"
                                    />
                                    <CommonLinks
                                        linkTo="/slashing-proposals"
                                        count={slashingActiveProposalsCount}
                                        linkTitle="– Slashing Proposals"
                                    />
                                    <CommonLinks
                                        linkTo="/contract-updates"
                                        count={contractUpdatesActiveProposalsCount}
                                        linkTitle="– Contract Updates"
                                    />
                                </>
                                )
                              : null}
                        </>
                    </AccordionLinks>

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
                            <CommonLinks openSidebar={openSidebar} linkTo="/time-locks" linkTitle="Time Locks" />
                        </>
                        )
                      : null}
                </div>
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
                        <ToggleSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                    </AccordionElements>
                    <Version />
                </FooterContainer>
            </div>
        </SidebarContainer>
  )
}

export default Sidebar
