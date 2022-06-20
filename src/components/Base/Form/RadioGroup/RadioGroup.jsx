
import { Form } from 'react-bootstrap';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';

import { RadioGroupWrapper } from './styles';

function RadioGroup ({
  name,
  value,
  options = [],
  label = '',
  error,
  row = false,
  onChange = (val) => {},
}) {
  return (
    <RadioGroupWrapper $row={row}>
      {label && <h4>{label}</h4>}
      <div className="radio-options">
        {options.map((option) => (
          <Form.Check
            key={option.value}
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
        ))}
      </div>
      {error && <ErrorInputMessage message={error} />}
    </RadioGroupWrapper>
  );
}

export default RadioGroup;
