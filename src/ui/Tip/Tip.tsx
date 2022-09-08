import { HTMLAttributes, ReactNode } from 'react';

import { Icon } from '@q-dev/q-ui-kit';
import { IconName } from '@q-dev/q-ui-kit/dist/components/Icon';

import { TipWrapper } from './styles';
import { TipType } from '.';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: TipType;
  compact?: boolean;
  action?: ReactNode;
}

function Tip ({
  type = 'info',
  compact = false,
  action,
  children,
  ...rest
}: Props) {
  const typeToIcon: Record<TipType, IconName> = {
    info: 'info',
    warning: 'warning',
  };

  return (
    <TipWrapper
      $type={type}
      $compact={compact}
      {...rest}
    >
      <Icon name={typeToIcon[type]} className="tip-icon" />
      <div className="tip-text text-md">{children}</div>
      <div className="tip-action">{action}</div>
    </TipWrapper>
  );
}

export default Tip;
