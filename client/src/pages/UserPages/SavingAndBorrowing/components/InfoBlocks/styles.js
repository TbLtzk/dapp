import styled from 'styled-components';
import { BlockBase } from 'constants/style';
import colors from 'constants/colors.js';

export const BlockInfo = styled(BlockBase)`
margin-bottom: 50px;
p.info {
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  color: ${colors.grey};
  margin-bottom: 5px;
}
p.value, div.value span {
  font-size: 36px;
  font-weight: 400;
  font-family: 'Rubik', sans-serif;
  color: ${colors.main};
  margin-bottom: 0;
  word-wrap: break-word;
}
`;
