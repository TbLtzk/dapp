import styled from 'styled-components';
import colors from 'constants/colors';

export const UpdateDelegationContainer = styled.div`
  padding: 0 24px;

  .title {
    font-weight: 600;
    font-size: 18px;
    color: ${colors.black};
    margin: 0;
  }

  span {
    display: block;
    color: ${colors.grey};
    font-size: 14px;
    margin: 15px 0;
  }

  .input_container_item {
    display: flex;

    .input_address {
      width: calc(100% - 100px);
      margin-right: 10px;
    }

    .input_share {
      width: 100px;
    }
  }

  .btn_container {
    margin-top: 20px;

    button:first-child {
      width: calc(70% - 10px);
      margin-right: 10px;
    }
  }

  .btn_additional button {
    padding: 6px 0;
  }
`;
