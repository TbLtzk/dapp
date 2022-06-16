import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useLangauge } from 'i18n';

import LogoImg from 'components/Base/LogoImg';

import Address from './components/Address';
import ConnectButtons from './components/ConnectButtons';
import Network from './components/Network';
import { ElementsWrapper, HeaderWrapper, WrapLogo } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Header () {
  const loadType = useSelector(loadTypeSelector);
  const { changeLang, languages } = useLangauge();

  return (
    <HeaderWrapper>
      <WrapLogo>
        <Link to="/">
          <LogoImg />
        </Link>
      </WrapLogo>
      <div style={{ display: 'flex' }}>
        {languages.map(({ lang, title }) => (
          <div key={lang}>
            <input
              type="submit"
              value={title}
              onClick={() => changeLang(lang)}
            />
          </div>
        ))}
      </div>
      <ElementsWrapper>
        <Network />
        <ConnectButtons />
        {loadType === LOAD_TYPES.loaded ? <Address /> : null}
      </ElementsWrapper>
    </HeaderWrapper>
  );
}

export default React.memo(Header);
