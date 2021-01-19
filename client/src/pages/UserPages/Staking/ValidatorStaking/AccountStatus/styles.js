import styled from 'styled-components';
import colors from 'constants/colors.js';

export const Headline = styled.p`
  color: ${colors.black};
  font-weight: 600;
  font-size: 20px;
`;

export const AccountContainer = styled.div`
  font-size: 14px;

  .list_1, .list_2 {
    color: ${colors.grey};
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .marker {
    height: 4px;
    width: 4px;
    background-color: ${colors.grey};
    border-radius: 50%;
    margin-right: 5px;
  }
  .list_2 {
    .marker {
      margin-left: 15px;
    }
    span {
      margin-top: 8px;
    }
  }
  .list_2_container {
    margin-bottom: 8px;
  }

  .stats_container {
    margin-top: 24px;

    div {
      color: ${colors.grey};
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
    }
  }

  .input_container {
    display: flex;
    height: 42px;
  }

  button {
    height: 46px;
  }

  .btn_container {
    display: flex;

    button:nth-child(2) {
      margin: 0 15px;
    }
  }

  .block-name {
    display: flex;
    justify-content: space-between;

    &>span:first-child {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
