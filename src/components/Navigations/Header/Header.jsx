import React from 'react';

import {
  HeaderWrp,
  HeaderTitle,
  HeaderActions
} from './styles';

function Header(props) {
  const {
    header,
    extra,
    extraButton
  } = props;

  return (
    <HeaderWrp>
      <HeaderTitle>
        {header}
      </HeaderTitle>
      <HeaderActions>
      {extraButton}
        {extra}
      </HeaderActions>
    </HeaderWrp>
  );
}

export default Header;
