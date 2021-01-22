import styled from 'styled-components';
import colors from 'constants/colors.js';

export const VotingStatsContainer = styled.div`
  .stats_container {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 15px;

    span:first-child {
      color: ${colors.grey}
    }
  }

  button {
    margin-top: 10px;
    height: 46px;
  }
`;

export const Title = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
`;
