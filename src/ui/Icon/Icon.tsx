import { HTMLAttributes } from 'react';

import icons from './icons.json';
import { StyledIcon } from './styles';
import { IconName } from '.';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  name: IconName
}

function Icon ({ name, ...rest }: Props) {
  return (
    <StyledIcon $content={icons[name]} {...rest} />
  );
}

export default Icon;
