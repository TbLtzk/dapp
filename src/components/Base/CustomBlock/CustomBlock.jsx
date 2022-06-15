import React from 'react';

import { Block } from './styles';

const CustomBlock = ({ children, style, ...rest }) => (
  <Block style={style} {...rest}>
    {children}
  </Block>
);

export default CustomBlock;
