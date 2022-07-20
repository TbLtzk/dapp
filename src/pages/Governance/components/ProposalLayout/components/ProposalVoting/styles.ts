import styled from 'styled-components';

export const StyledProposalVoting = styled.div`
  .proposal-voting__majority {
    margin-top: 16px;
  }

  .proposal-voting__progress {
    margin-top: 8px;
  }

  .proposal-voting__votes {
    margin-top: 24px;
    display: grid;
    gap: 16px;
  }

  .proposal-voting__vote {
    display: grid;
    grid-template-columns: auto 1fr 1fr 3fr;
    gap: 8px;
  }

  .proposal-voting__vote-bg {
    width: 8px;
    border-radius: 8px;
  }

  .proposal-voting__vote-val {
    text-align: right;
  }
`;
