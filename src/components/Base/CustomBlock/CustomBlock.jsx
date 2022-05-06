import React from 'react';

import { Block } from './styles';

const CustomBlock = ({ children, style }) => (
  <Block style={style}>
    {children}
  </Block>
);

export default CustomBlock;
