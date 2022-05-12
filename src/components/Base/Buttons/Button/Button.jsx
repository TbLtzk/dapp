import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { ButtonCustom } from './styles';

import { theme } from 'store/theme/selectors';
import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Button ({
  title,
  type,
  position,
  right,
  top,
  margin,
  width,
  disabled,
  icon,
  iconFontSize,
  isIconPositionRight,
  alwaysEnabled,
  handleButton = () => {},
}) {
  const currentTheme = useSelector(theme);
  const loadType = useSelector(loadTypeSelector);

  const isUserLoggedIn = loadType === LOAD_TYPES.loaded ? disabled : true;

  const shouldDisable = alwaysEnabled ? false : isUserLoggedIn;

  return (
    <ButtonCustom
      palette={currentTheme}
      disabled={shouldDisable}
      type={type}
      width={width}
      position={position}
      right={right}
      top={top}
      margin={margin}
      title={icon === 'copy' ? null : title}
      iconfontsize={iconFontSize}
      isiconpositionright={isIconPositionRight ? '1' : ''}
      onClick={handleButton}
    >
      {icon
        ? (
          isIconPositionRight
            ? (
              <>
                {title}
                <i className={`mdi mdi-${icon} btn-icon`} />
              </>
            )
            : (
              <>
                <i className={`mdi mdi-${icon} btn-icon`} />
                {title}
              </>
            )
        )
        : (
          title
        )}
    </ButtonCustom>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'main',
  width: '',
  disabled: false
};

export default Button;
