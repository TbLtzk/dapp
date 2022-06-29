import { HTMLAttributes } from 'react';

import icons from './icons.json';
import { StyledIcon } from './styles';

export type IconName = keyof typeof icons
interface Props extends HTMLAttributes<HTMLSpanElement> {
  name: IconName
}

function Icon ({ name, ...rest }: Props) {
  return (
    <StyledIcon $content={icons[name]} {...rest} />
  );
}

export default Icon;
