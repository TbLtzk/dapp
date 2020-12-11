import styled from 'styled-components';

import { Col } from 'react-bootstrap';

export const DatePickerContainer = styled(Col)`
  display: flex;
  .form-group {
    margin-right: 10px;
  }
   .form-group: last-child {
    margin-right: 0;
  }
  .react-datepicker-wrapper input {
    min-width: 125px;
  }
`;
