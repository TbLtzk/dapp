import React from 'react';
import PropTypes from 'prop-types';

import { ButtonCustom } from './styles';

function Button(props) {
  const { title, type, width, disabled, handleButton } = props;

  return (
    <ButtonCustom
      disabled={disabled}
      type={type}
      width={width}
      variant="primary"
      onClick={handleButton}
    >
      {title}
    </ButtonCustom>
  );
}

Button.propTypes = {
  // title: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  handleButton: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'main',
  width: '100%',
  disabled: false,
};

export default Button;
