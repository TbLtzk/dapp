import { StyledSwitch } from './styles';

const Switch = ({
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

export default Switch;
