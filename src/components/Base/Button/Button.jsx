import React from 'react';
import { useSelector } from 'react-redux';

import { ButtonCustom } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Button ({
  title,
  icon,
  type = 'button',
  look = '',
  iconFontSize,
  iconRight = false,
  disabled = false,
  alwaysEnabled = false,
  style,
  onClick = () => {},
}) {
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;

  return (
    <ButtonCustom
      type={type}
      disabled={!alwaysEnabled && isDisabled}
      style={style}
      $look={look}
      $iconRight={iconRight}
      $iconFontSize={iconFontSize}
      onClick={onClick}
    >
      {icon && <i className={`mdi mdi-${icon} btn-icon`} />}
      {title}
    </ButtonCustom>
  );
}

export default Button;
