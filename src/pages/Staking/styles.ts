import styled from 'styled-components';
import { media } from 'styles/media';

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
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      
      .block_header-title {
        display: flex;
        align-items: center;
      }

      .block_header-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;

        ${media.lessThan('medium')} {
          display: contents;
        }
      }
    }

    .block-body {
      display: grid;
      grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);

      ${media.lessThan('medium')} {
        grid-template-columns: minmax(0, 1fr);
      }

      & > div {
        padding: 24px;

        ${media.lessThan('medium')} {
          padding: 8px 0;
        
        &:nth-child(even) {
          border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};

          ${media.lessThan('medium')} {
            border-left: none;
          }
        }
        
        &:nth-child(odd) {
          border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};

          ${media.lessThan('medium')} {
            border-left: none;
          }
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
  }

  .delegation-reward_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    ${media.lessThan('medium')} {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.blockDivider};
      margin-top: 16px;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
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

  ${media.lessThan('medium')} {
    .delegation-form_container {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      margin-bottom: 10px;
      margin-top: 10px;

      .delegation-form_inputs {
        display: flex;
        flex-direction: column;
      }

      .delegation-form_buttons {
        display: flex;
        align-items: center;
        margin-left: 15px;
      }
    }
  }
`;
