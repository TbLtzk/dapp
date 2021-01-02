import styled from 'styled-components';
import { Block } from 'components/Base/CustomBlock/styles';
import colors from '../../../constants/colors';

export const CustomBlockVP = styled(Block)`
  div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }

    span {
      font-size: 14px;


      &:first-child, &.grey {
        color: ${colors.grey}
      }

      &:last-child {
        color: ${colors.black}
      }
    }
  }

  .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
`;
