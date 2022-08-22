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
        justify-content: space-between;
      }

      .block_header-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        gap: 16px;

        ${media.lessThan('small')} {
          display: contents;
        }
      }
    }

    .block-body {
      margin-top: 16px;
      display: grid;
      grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);

      ${media.lessThan('medium')} {
        grid-template-columns: minmax(0, 1fr);
      }

      & > div {
        padding: 12px 16px;

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
      }
    }
  }

  .delegation-info_container {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
    }

    .delegation-item {
      display: grid;
      align-content: start;
      padding: 24px;

      ${media.lessThan('medium')} {
        padding: 8px 0;
      }

      &:not(:first-child) {
        ${media.greaterThan('medium')} {
          border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};
        }
      }
    }
  }

`;

export const StakeFormContainer = styled.form`
  .validator-info {
    margin-bottom: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
