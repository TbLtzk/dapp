import { HTMLAttributes } from 'react';

import Spinner from 'ui/Spinner';

import { StyledButton } from './styles';

import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

export type ButtonLook = 'primary' | 'secondary' | 'ghost' | 'danger';
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
  type = 'button',
  look = 'primary',
  disabled = false,
  alwaysEnabled = false,
  icon = false,
  compact = false,
  loading = false,
  active = false,
  block = false,
  children,
  className,
  onClick = () => {},
  ...rest
}: Props) {
  const { loadType } = useUser();
  const isDisabled = disabled ||
    (!alwaysEnabled && loadType !== LOAD_TYPES.loaded);

  return (
    <StyledButton
      className={`text-md font-semibold ${className || ''}`}
      as={block ? 'div' : 'button'}
      type={type}
      disabled={isDisabled}
      $look={look}
      $icon={icon}
      $compact={compact}
      loading={String(loading)}
      data-active={String(active)}
      tabIndex={loading || block ? -1 : 0}
      onClick={onClick}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </StyledButton>
  );
}

export default Button;
