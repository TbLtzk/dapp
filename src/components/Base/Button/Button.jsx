import { useSelector } from 'react-redux';

import { ButtonCustom } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Button ({
  type = 'button',
  look = '',
  disabled = false,
  alwaysEnabled = false,
  children,
  onClick = () => {},
  ...rest
}) {
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;

  return (
    <ButtonCustom
      type={type}
      disabled={!alwaysEnabled && isDisabled}
      $look={look}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ButtonCustom>
  );
}

export default Button;
