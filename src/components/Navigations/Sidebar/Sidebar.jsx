import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import colors from 'constants/colors';

import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import Button from 'components/Base/Buttons/Button';
import LogoImg from 'components/Base/LogoImg';
import Version from './components/Version';

import { navItems, referencesItems } from './constants';

import {
  NavbarContainer,
  ListContainer,
  LinkStyle,
  WrapLogo,
  ListTitle,
  ALinkStyle,
  LinksContainer,
  FooterContainer
} from './styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Sidebar() {
  const history = useHistory();
  const userAddress = useSelector(userAddressMetamask);

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
            {
              navItems.map((value, key) => {
                return (
                  <LinkStyle
                    to={'/' + value.location}
                    key={key}
                    onClick={(e) => {
                      // e.preventDefault();
                      // history.push(value.location);
                    }}
                    className="nav-link"
                    highlight={Number(history.location.pathname === ('/' + value.location))}
                  >
                    {value.label}
                  </LinkStyle>
                );
              })
            }
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
                    target={value.tag === 'a' ? '_blank' : '_self'}
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
              handleButton={() => {}}
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

