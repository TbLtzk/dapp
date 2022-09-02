import { HTMLAttributes } from 'react';

import { TagContainer } from './styles';
import { TagState } from '.';

interface Props extends HTMLAttributes<HTMLDivElement> {
  state: TagState;
}

function Tag ({
  state,
  children,
  ...rest
}: Props) {
  return (
    <TagContainer
      className="text-md"
      $state={state}
      {...rest}
    >
      {children}
    </TagContainer>
  );
};

export default Tag;
