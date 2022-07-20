import styled from 'styled-components';

export const StyledProposalVeto = styled.div`
  .proposal-veto__quorum {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }

  .proposal-veto__progress {
    margin-top: 8px;
  }

  .proposal-veto__votes {
    margin-top: 24px;
    display: grid;
    gap: 16px;
  }

  .proposal-veto__vote {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    gap: 8px;
  }

  .proposal-veto__vote-val {
    text-align: right;
  }

  .proposal-veto__stub {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
  }
`;
