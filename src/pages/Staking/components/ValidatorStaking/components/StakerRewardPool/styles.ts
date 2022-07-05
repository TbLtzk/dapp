import styled from 'styled-components';

export const StyledStakerRewardPool = styled.div`
  .validator-pool_container {
    .validator-pool_cards {
      display: grid;
      grid-template-columns: auto auto;
      .validator-pool_info {
        padding: 10px;
      }
    }
  }

  .refresh-delegation_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .reward-stats_container {
    margin-top: 10px;
    .reward-stats_cards {
      display: grid;
      grid-template-columns: auto auto auto;
      .reward-stats_info {
        padding: 10px;
      }
    }
  }
  .delegator-share-form {
      margin-top: 5px;
    * > {
      &:first-child {
        margin-right: 20px;
      }
    }
    display: flex;
  }
`;
