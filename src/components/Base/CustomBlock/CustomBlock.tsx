
import { CSSProperties, ReactNode } from 'react';

import { Block } from './styles';

interface Props {
  children: ReactNode
  style?: CSSProperties
}

const CustomBlock = ({ children, style, ...rest }: Props) => (
  <Block style={style} {...rest}>
    {children}
  </Block>
);

export default CustomBlock;
