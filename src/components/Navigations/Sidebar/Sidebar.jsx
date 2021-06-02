import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

import colors from 'constants/colors';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { qProposalsArr } from 'store/selectors/voting/q-proposals';
import { rootNodeProposalsArr } from 'store/selectors/voting/root-node-proposals';
import { expertProposalsArr } from 'store/selectors/voting/expert-proposals';
import { slashingProposalsArr } from 'store/selectors/voting/slashing-proposals';
import {
  liquidationAuctions,
  systemDebtAuctions,
  systemSurplusAuctions,
} from 'store/selectors/auctions/auctions';

import Button from 'components/Base/Buttons/Button';
import LogoImg from 'components/Base/LogoImg';
import Version from './components/Version';

import { referencesItems } from './constants';

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
  AccordionLbl
} from './styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PROPOSALS_TYPES, AUCTIONS_TYPES } from 'constants/statuses';
import { getProposalsList } from 'store/actions/action-creaters/voting/proposals';
import { getAuctionsList } from 'store/actions/action-creaters/auctions/auctions';

function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const qProposals = useSelector(qProposalsArr);
  const rootNodeProposals = useSelector(rootNodeProposalsArr);
  const expertProposals = useSelector(expertProposalsArr);
  const slashingProposals = useSelector(slashingProposalsArr);

  const liquidations = useSelector(liquidationAuctions);
  const systemDebts = useSelector(systemDebtAuctions);
  const systemSurplus = useSelector(systemSurplusAuctions);

  const [isGovernanceAccordionOpened, setIsGovernanceAccordionOpened] = useState('1');
  const [isAuctionAccordionOpened, setIsAuctionAccordionOpened] = useState('1');

  function highlight(location) {
    return Number(history.location.pathname === ('/' + location));
  }

  useEffect(() => {
    for (let item in PROPOSALS_TYPES) {
      dispatch(getProposalsList(PROPOSALS_TYPES[item]));
    }
    for (let item in AUCTIONS_TYPES) {
      dispatch(getAuctionsList(AUCTIONS_TYPES[item], true));
    }
  }, []);

  return (
    <header>
      <NavbarContainer bg={colors.oxfordBlue} expand="lg">
        <LinksContainer>
          <WrapLogo>
            <Link to={'/'}>
              <LogoImg/>
            </Link>
          </WrapLogo>
          <ListContainer id="basic-navbar-nav">
            <LinkStyle
              to={'/'}
              className="nav-link"
              highlight={highlight('')}
            >
              Dashboard
            </LinkStyle>
            <Accordion
              defaultActiveKey="0"
              style={{ width: '100%' }}
              onSelect={(state) => {
                if (state) {
                  setIsGovernanceAccordionOpened('1');
                } else {
                  setIsGovernanceAccordionOpened('');
                }
              }}>
              <LinkGroup>
                <LinkStyle
                  to={'/q-governance'}
                  className="nav-link"
                  highlight={highlight('q-governance')}
                >
                  Q Governance
                </LinkStyle>
                <Accordion.Toggle eventKey="0">
                  <AccordionIcon state={isGovernanceAccordionOpened}>
                    <i className={`mdi mdi-chevron-down`}/>
                  </AccordionIcon>
                </Accordion.Toggle>
              </LinkGroup>
              <Accordion.Collapse eventKey="0">
                <div>
                  <LinkGroup>
                    <LinkStyle
                      to={'/q-proposals'}
                      className="nav-link"
                      highlight={highlight('q-proposals')}
                    >– Q Proposals</LinkStyle>
                    {qProposals.length ? (
                      <AccordionLbl highlight={highlight('q-proposals')}>
                        {qProposals.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                  <LinkGroup>
                    <LinkStyle
                      to={'/q-root-node-panel'}
                      className="nav-link"
                      highlight={highlight('q-root-node-panel')}
                    >– Root Node Panel</LinkStyle>
                    {rootNodeProposals.length ? (
                      <AccordionLbl highlight={highlight('q-root-node-panel')}>
                        {rootNodeProposals.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                  <LinkGroup>
                    <LinkStyle
                      to={'/q-expert-proposals'}
                      className="nav-link"
                      highlight={highlight('q-expert-proposals')}
                    >– Expert Proposals</LinkStyle>
                    {expertProposals.length ? (
                      <AccordionLbl highlight={highlight('q-expert-proposals')}>
                        {expertProposals.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                  <LinkGroup>
                    <LinkStyle
                      to={'/slashing-proposals'}
                      className="nav-link"
                      highlight={highlight('slashing-proposals')}
                    >– Slashing Proposals</LinkStyle>
                    {slashingProposals.length ? (
                      <AccordionLbl highlight={highlight('slashing-proposals')}>
                        {slashingProposals.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                </div>
              </Accordion.Collapse>
            </Accordion>
            <LinkStyle
              to={'/piggy-bank'}
              className="nav-link"
              highlight={highlight('piggy-bank')}
            >
              Q Vault
            </LinkStyle>
            <LinkStyle
              to={'/staking'}
              className="nav-link"
              highlight={highlight('staking')}
            >
              Staking
            </LinkStyle>
            <LinkStyle
              to={'/saving-and-borrowing'}
              className="nav-link"
              highlight={highlight('saving-and-borrowing')}
            >
              Saving & Borrowing
            </LinkStyle>
            <Accordion
              defaultActiveKey="0"
              style={{ width: '100%' }}
              onSelect={(state) => {
                if (state) {
                  setIsAuctionAccordionOpened('1');
                } else {
                  setIsAuctionAccordionOpened('');
                }
              }}>
              <LinkGroup>
                <LinkStyle
                  to={'/liquidation'}
                  className="nav-link"
                >
                  Decentralized Auctions
                </LinkStyle>
                <Accordion.Toggle eventKey="0">
                  <AccordionIcon state={isAuctionAccordionOpened}>
                    <i className={`mdi mdi-chevron-down`}/>
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
                    >– Liquidation</LinkStyle>
                    {liquidations.length ? (
                      <AccordionLbl highlight={highlight('liquidation')}>
                        {liquidations.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                  <LinkGroup>
                    <LinkStyle
                      to={'/system-debt'}
                      className="nav-link"
                      highlight={highlight('system-debt')}
                    >– System Debt</LinkStyle>
                    {systemDebts.length ? (
                      <AccordionLbl highlight={highlight('system-debt')}>
                        {systemDebts.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                  <LinkGroup>
                    <LinkStyle
                      to={'/system-surplus'}
                      className="nav-link"
                      highlight={highlight('system-surplus')}
                    >– System Surplus</LinkStyle>
                    {systemSurplus.length ? (
                      <AccordionLbl highlight={highlight('system-surplus')}>
                        {systemSurplus.length}
                      </AccordionLbl>
                    ) : null}
                  </LinkGroup>
                </div>
              </Accordion.Collapse>
            </Accordion>
          </ListContainer>
          <ListTitle>References</ListTitle>
          <ListContainer>
            {
              referencesItems.map((value, key) => {
                return (
                  <ALinkStyle
                    key={'references' + key}
                    className="nav-link"
                    href={value.location}
                    target='_blank'
                  >
                    {value.label}
                  </ALinkStyle>
                );
              })
            }
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
                handleButton={() => {
                }}
              />
              </span>
          </CopyToClipboard>
          <Version/>
        </FooterContainer>
      </NavbarContainer>
    </header>
  );
}

export default Sidebar;

