import React from 'react';
import PropTypes from 'prop-types';

import { ButtonCustom } from './styles';

function Button(props) {
  const {
    title,
    type,
    width,
    disabled,
    handleButton,
    icon,
    iconFontSize,
    isIconPositionRight,
  } = props;

  return (
    <ButtonCustom
      disabled={disabled}
      type={type}
      width={width}
      variant="primary"
      onClick={handleButton}
      title={title}
      iconfontsize={iconFontSize}
      isiconpositionright={isIconPositionRight ? '1' : ''}
    >
      {icon ? isIconPositionRight ?
        (<>
          {title}<i className={`mdi mdi-${icon} btn-icon`}/>
        </>)
        :
        (<>
          <i className={`mdi mdi-${icon} btn-icon`}/>{title}
        </>)
        : title}
    </ButtonCustom>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  handleButton: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'main',
  width: '',
  disabled: false,
};

export default Button;
