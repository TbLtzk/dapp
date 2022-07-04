import styled from 'styled-components';

export const StakingContainer = styled.div`
  .staking-switch {
    margin-top: 20px;
  }
  p.text-md {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .block {
    margin-top: 30px;
    margin-bottom: 40px;
    .block_header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .block_header-title {
        display: flex;
        align-items: center;
      }
      .block_header-buttons {
        display: flex;
      }
    }
    .block-body {
      display: grid;
      grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);

      & > div {
        padding: 24px;
        &:nth-child(even) {
          border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};
        }
        &:nth-child(odd) {
          border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};
        }
        &:nth-child(-n + 3) {
          border-top: none;
        }
        &:first-child,
        &:nth-child(3n + 1) {
          border-left: none;
        }
      }
      p {
        margin-top: 4px;
      }
    }
  }

  .delegation-reward_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .delegation-form_container {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 10px;
    margin-top: 10px;

    .delegation-form_inputs {
      display: flex;
      width: 100%;
      div:first-child {
        margin-right: 10px;
      }
    }
    .delegation-form_buttons {
      width: 100px;
      padding-top: 32px;
      padding-left: 5px;
    }
  }
`;
