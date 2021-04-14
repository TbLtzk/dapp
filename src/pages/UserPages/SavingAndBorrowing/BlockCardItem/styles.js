import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import colors from 'constants/colors.js';

export const ContainerBCI = styled(Row)`
padding: 30px 9px;
background: ${colors.white};
margin: 0;

div.info-cont {
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.grey};
    margin-bottom: 16px;
  }
  span:last-child {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.blue};
  }
}

&.active {
  position: relative;
  background-color: ${colors.blue};

  div.info-cont {
    span:first-child {
      color: rgba(255, 255, 255, 0.7);
    }
    span:last-child {
      color: #F3F7FC;
    }
  }
}
`;
