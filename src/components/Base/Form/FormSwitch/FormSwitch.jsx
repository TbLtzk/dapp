import React from 'react';

import { StyledSwitch } from './styles';

const FormSwitch = ({
  label,
  checked,
  id,
  onChange,
  ...rest
}) => {
  return (
    <StyledSwitch
      id={id}
      label={label}
      checked={checked}
      {...rest}
      onChange={onChange}
    />
  );
};

export default FormSwitch;
