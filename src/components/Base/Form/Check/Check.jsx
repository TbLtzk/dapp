import { Form } from 'react-bootstrap';

import { CheckWrapper } from './styles';

function Check ({ label, checked, onChange, id }) {
  return (
    <CheckWrapper>
      <Form.Check
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </CheckWrapper>
  );
};

export default Check;
