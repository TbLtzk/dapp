import { HTMLAttributes } from 'react';

import { Button as UiButton } from '@q-dev/q-ui-kit';
import { ButtonLook } from '@q-dev/q-ui-kit/dist/components/Button/Button';

import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  look?: ButtonLook;
  disabled?: boolean;
  alwaysEnabled?: boolean;
  icon?: boolean;
  compact?: boolean;
  loading?: boolean;
  active?: boolean;
  block?: boolean;
}

function Button ({
  type,
  look,
  disabled,
  alwaysEnabled,
  icon,
  compact,
  loading,
  active,
  block,
  children,
  className,
  onClick,
  ...rest
}: Props) {
  const { loadType } = useUser();
  const isDisabled = disabled ||
    (!alwaysEnabled && loadType !== LOAD_TYPES.loaded);

  return (
    <UiButton
      className={className}
      type={type}
      block={block}
      disabled={isDisabled}
      look={look}
      icon={icon}
      compact={compact}
      loading={loading}
      active={active}
      onClick={onClick}
      {...rest}
    >
      {children}
    </UiButton>
  );
}

export default Button;
