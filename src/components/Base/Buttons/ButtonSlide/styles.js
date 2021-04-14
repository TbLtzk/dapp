import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import colors from '../../../../constants/colors';

export const ButtonSlideForm = styled.form`
position: relative;

.form-group {
  flex-direction: column;
  input {
    height: 46px;
  }
}
`;

export const BtnSlide = styled(Button)`
height: 46px;
background: ${colors.blue};
box-shadow: 0px 4px 4px rgba(81, 126, 255, 0.25);
border-radius: 8px;
border: none;
position: absolute;
width: 100%;
top: 0;
right: 0;
font-weight: 600;
font-size: 14px;

&.enabled {
  width: auto;
  min-width: 100px;
}
`;
