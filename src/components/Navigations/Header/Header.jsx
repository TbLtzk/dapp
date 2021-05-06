import React from 'react';

import {
  HeaderWrp,
  HeaderTitle,
  HeaderActions
} from './styles';

function Header(props) {
  const {
    header,
    extra
  } = props;

  return (
    <HeaderWrp>
      <HeaderTitle>
        {header}
      </HeaderTitle>
      <HeaderActions>
        {extra}
      </HeaderActions>
    </HeaderWrp>
  );
}

export default Header;
