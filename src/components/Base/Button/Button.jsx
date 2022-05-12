import React from 'react';
import { useSelector } from 'react-redux';

import { ButtonCustom } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Button ({
  title,
  type = 'main',
  style,
  disabled = false,
  icon,
  iconFontSize,
  isIconPositionRight,
  alwaysEnabled,
  onClick = () => {},
}) {
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;

  return (
    <ButtonCustom
      type={type}
      disabled={!alwaysEnabled && isDisabled}
      iconfontsize={iconFontSize}
      $iconRight={isIconPositionRight}
      style={style}
      onClick={onClick}
    >
      {icon && <i className={`mdi mdi-${icon} btn-icon`} />}
      <span>{title}</span>
    </ButtonCustom>
  );
}

export default Button;
