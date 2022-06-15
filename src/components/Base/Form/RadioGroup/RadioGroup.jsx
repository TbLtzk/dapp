
import ErrorInputMessage from 'components/Base/ErrorInputMessage';

import { GroupWrapper, RadioInput } from './styles';

function RadioGroup ({
  name,
  value,
  options = [],
  label,
  error,
  onChange = () => {},
}) {
  return (
    <div>
      {label && <h4>{label}</h4>}
      {options.map((option) => {
        return (
          <GroupWrapper
            key={option.value}
            controlId={value}
          >
            <RadioInput
              id={`${name}__${option.value}`}
              type="radio"
              label={option.label}
              name={name}
              value={value}
              checked={option.value === value}
              $checked={option.value === value}
              onChange={() => onChange(option.value)}
              onClick={() => onChange(option.value)}
            />
          </GroupWrapper>
        );
      })}
      {error && <ErrorInputMessage message={error} />}
    </div>
  );
}

export default RadioGroup;
