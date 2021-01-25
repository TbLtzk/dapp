import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { BlockBase } from 'constants/style';
import colors from 'constants/colors.js';

// export const ContainerSB = styled(Row)`
export const ContainerSB = styled(Row)`
.col-info-container.saving, .col-info-container.borrow {
  display: none;
}

.col-info-container.saving.active, .col-info-container.borrow.active {
  display: block;
}
`;

export const BlockCard = styled(BlockBase)`
padding-left: 0;
padding-right: 0;

p {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 0px;
  padding: 0 24px;
}

&.first, &.last {
  &:after, &:after {
    width: calc(100% - 30px);
    height: 24px;
    position: absolute;
    right: 15px;
    border-radius: 0 0 8px 8px;
  }
}

&.first {
  background-color: ${colors.blue};
  p {
    color: ${colors.white};
  }
}

&.first:after {
  background-color: ${colors.white};
  content: "";
}

&.last:after {
  background-color: ${colors.blue};
  content: "";
}
`;

export const CardDetail = styled(BlockBase)`
font-family: Mulish;
font-weight: 600;

.title-1 {
  font-size: 24px;
}
.title-2 {
  font-size: 18px;
  margin: 24px 0 12px 0;
}
div.txt {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  span {
    font-size: 14px;
  }
  span:first-child {
    color: ${colors.grey}
  }

  span:last-child {
    font-weight: 500;
    color: ${colors.black}
  }
}

.btn-group {
  display: block;
  margin-top: 75px;
}
`;
