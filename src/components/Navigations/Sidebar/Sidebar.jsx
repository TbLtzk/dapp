import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Accordion } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { qActiveProposalsCountSelector } from 'store/voting/q-proposals/selectors'
import { rootActiveProposalsCountSelector } from 'store/voting/root-node-proposals/selectors'
import { expertActiveProposalsCountSelector } from 'store/voting/expert-proposals/selectors'
import { slashingActiveProposalsCountSelector } from 'store/voting/slashing-proposals/selectors'
import { liquidationAuctions, systemDebtAuctions, systemSurplusAuctions } from 'store/auctions/selectors'

import Button from 'components/Base/Buttons/Button'
import LogoImg from 'components/Base/LogoImg'
import Version from './components/Version'
import Settings from './components/Settings'

import { referencesItems } from './constants'

import {
  NavbarContainer,
  ListContainer,
  LinkStyle,
  WrapLogo,
  ListTitle,
  ALinkStyle,
  LinksContainer,
  FooterContainer,
  LinkGroup,
  AccordionIcon,
  AccordionLbl,
  Footer
} from './styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton'
import { getAuctionsList } from 'store/auctions/action-creators'
import { AUCTIONS_TYPES } from 'constants/statuses'
import { getQProposalsCount } from 'store/voting/q-proposals/action-creators'
import { getRootProposalsCount } from 'store/voting/root-node-proposals/action-creators'
import { getSlashingProposalsCount } from 'store/voting/slashing-proposals/action-creators'
import { getExpertProposalsCount } from 'store/voting/expert-proposals/action-creators'
import { getNumberAllProposals } from 'store/voting/proposals/action-creators'

function Sidebar () {
  const history = useHistory()
  const dispatch = useDispatch()
  const userAddress = useSelector(userAddressMetamask)
  const appMode = useSelector(mode)

  const liquidations = useSelector(liquidationAuctions)
  const systemDebts = useSelector(systemDebtAuctions)
  const systemSurplus = useSelector(systemSurplusAuctions)

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector)
  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector)
  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector)
  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector)

  const [isGovernanceAccordionOpened, setIsGovernanceAccordionOpened] = useState('1')
  const [isAuctionAccordionOpened, setIsAuctionAccordionOpened] = useState('1')

  function highlight (location) {
    return Number(history.location.pathname === '/' + location)
  }

  useEffect(() => {
    for (const item in AUCTIONS_TYPES) {
      dispatch(getAuctionsList(AUCTIONS_TYPES[item], true))
    }
  }, [])

  return (
        <header>
            <NavbarContainer expand="lg">
                <LinksContainer>
                    <WrapLogo>
                        <Link to={'/'}>
                            <LogoImg />
                        </Link>
                    </WrapLogo>
                    <ListContainer id="basic-navbar-nav">
                        <LinkStyle to={'/'} className="nav-link" highlight={highlight('')}>
                            Dashboard
                        </LinkStyle>
                        <Accordion
                            defaultActiveKey="0"
                            style={{ width: '100%' }}
                            onSelect={(state) => {
                              if (state) {
                                setIsGovernanceAccordionOpened('1')
                              } else {
                                setIsGovernanceAccordionOpened('')
                              }
                            }}
                        >
                            <LinkGroup>
                                <LinkStyle
                                    onClick={() => dispatch(getNumberAllProposals())}
                                    to={'/q-governance'}
                                    className="nav-link"
                                    highlight={highlight('q-governance')}
                                >
                                    Governance
                                </LinkStyle>
                                <Accordion.Toggle eventKey="0">
                                    <AccordionIcon state={isGovernanceAccordionOpened}>
                                        <i className={'mdi mdi-chevron-down'} />
                                    </AccordionIcon>
                                </Accordion.Toggle>
                            </LinkGroup>
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <LinkGroup>
                                        <LinkStyle
                                            onClick={() => dispatch(getQProposalsCount())}
                                            to={'/q-proposals'}
                                            className="nav-link"
                                            highlight={highlight('q-proposals')}
                                        >
                                            – Q Proposals
                                        </LinkStyle>
                                        {qActiveProposalsCount <= 0
                                          ? null
                                          : (
                                            <AccordionLbl highlight={highlight('q-proposals')}>
                                                {qActiveProposalsCount}
                                            </AccordionLbl>
                                            )}
                                    </LinkGroup>
                                    <LinkGroup>
                                        <LinkStyle
                                            onClick={() => dispatch(getRootProposalsCount())}
                                            to={'/q-root-node-panel'}
                                            className="nav-link"
                                            highlight={highlight('q-root-node-panel')}
                                        >
                                            – Root Node Panel
                                        </LinkStyle>
                                        {rootActiveProposalsCount <= 0
                                          ? null
                                          : (
                                            <AccordionLbl highlight={highlight('q-root-node-panel')}>
                                                {rootActiveProposalsCount}
                                            </AccordionLbl>
                                            )}
                                    </LinkGroup>
                                    {appMode === MODE.advanced
                                      ? (
                                        <>
                                            <LinkGroup>
                                                <LinkStyle
                                                    onClick={() => dispatch(getExpertProposalsCount())}
                                                    to={'/q-expert-proposals'}
                                                    className="nav-link"
                                                    highlight={highlight('q-expert-proposals')}
                                                >
                                                    – Expert Proposals
                                                </LinkStyle>
                                                {expertActiveProposalsCount <= 0
                                                  ? null
                                                  : (
                                                    <AccordionLbl highlight={highlight('q-expert-proposals')}>
                                                        {expertActiveProposalsCount}
                                                    </AccordionLbl>
                                                    )}
                                            </LinkGroup>
                                            <LinkGroup>
                                                <LinkStyle
                                                    onClick={() => dispatch(getSlashingProposalsCount())}
                                                    to={'/slashing-proposals'}
                                                    className="nav-link"
                                                    highlight={highlight('slashing-proposals')}
                                                >
                                                    – Slashing Proposals
                                                </LinkStyle>
                                                {slashingActiveProposalsCount <= 0
                                                  ? null
                                                  : (
                                                    <AccordionLbl highlight={highlight('slashing-proposals')}>
                                                        {slashingActiveProposalsCount}
                                                    </AccordionLbl>
                                                    )}
                                            </LinkGroup>
                                        </>
                                        )
                                      : null}
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                        <LinkStyle to={'/q-vault'} className="nav-link" highlight={highlight('q-vault')}>
                            Q Vault
                        </LinkStyle>
                        {appMode === MODE.advanced
                          ? (
                            <LinkStyle to={'/staking'} className="nav-link" highlight={highlight('staking')}>
                                Consensus Services
                            </LinkStyle>
                            )
                          : null}
                        <LinkStyle
                            to={'/saving-and-borrowing'}
                            className="nav-link"
                            highlight={highlight('saving-and-borrowing')}
                        >
                            Saving & Borrowing
                        </LinkStyle>
                        {appMode === MODE.advanced
                          ? (
                            <Accordion
                                defaultActiveKey="0"
                                style={{ width: '100%' }}
                                onSelect={(state) => {
                                  if (state) {
                                    setIsAuctionAccordionOpened('1')
                                  } else {
                                    setIsAuctionAccordionOpened('')
                                  }
                                }}
                            >
                                <LinkGroup>
                                    <LinkStyle to={'/liquidation'} className="nav-link">
                                        Decentralized Auctions
                                    </LinkStyle>
                                    <Accordion.Toggle eventKey="0">
                                        <AccordionIcon state={isAuctionAccordionOpened}>
                                            <i className={'mdi mdi-chevron-down'} />
                                        </AccordionIcon>
                                    </Accordion.Toggle>
                                </LinkGroup>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <LinkGroup>
                                            <LinkStyle
                                                to={'/liquidation'}
                                                className="nav-link"
                                                highlight={highlight('liquidation')}
                                            >
                                                – Liquidation
                                            </LinkStyle>
                                            {liquidations.length
                                              ? (
                                                <AccordionLbl highlight={highlight('liquidation')}>
                                                    {liquidations.length}
                                                </AccordionLbl>
                                                )
                                              : null}
                                        </LinkGroup>
                                        <LinkGroup>
                                            <LinkStyle
                                                to={'/system-debt'}
                                                className="nav-link"
                                                highlight={highlight('system-debt')}
                                            >
                                                – System Debt
                                            </LinkStyle>
                                            {systemDebts.length
                                              ? (
                                                <AccordionLbl highlight={highlight('system-debt')}>
                                                    {systemDebts.length}
                                                </AccordionLbl>
                                                )
                                              : null}
                                        </LinkGroup>
                                        <LinkGroup>
                                            <LinkStyle
                                                to={'/system-surplus'}
                                                className="nav-link"
                                                highlight={highlight('system-surplus')}
                                            >
                                                – System Surplus
                                            </LinkStyle>
                                            {systemSurplus.length
                                              ? (
                                                <AccordionLbl highlight={highlight('system-surplus')}>
                                                    {systemSurplus.length}
                                                </AccordionLbl>
                                                )
                                              : null}
                                        </LinkGroup>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                            )
                          : null}
                        {appMode === MODE.advanced
                          ? (
                            <LinkStyle to={'/time-locks'} className="nav-link" highlight={highlight('time-locks')}>
                                Time Locks
                            </LinkStyle>
                            )
                          : null}
                    </ListContainer>
                    <ListTitle>References</ListTitle>
                    <ListContainer>
                        {referencesItems.map((value, key) => {
                          return (
                                <ALinkStyle
                                    key={'references' + key}
                                    className="nav-link"
                                    href={value.location}
                                    target="_blank"
                                >
                                    {value.label}
                                </ALinkStyle>
                          )
                        })}
                    </ListContainer>
                </LinksContainer>
                <FooterContainer>
                    <CopyToClipboard text={userAddress}>
                        <span title={userAddress}>
                            <Button
                                width={'100%'}
                                type={'white'}
                                title={userAddress}
                                icon={'content-copy'}
                                handleButton={() => {}}
                            />
                        </span>
                    </CopyToClipboard>
                    <Footer>
                        <Settings />
                        <Version />
                    </Footer>
                </FooterContainer>
            </NavbarContainer>
        </header>
  )
}

export default Sidebar
