import styled from 'styled-components';

import { getVoteFormColor } from './colors';

export const StyledVoteForm = styled.form<{ $selectedOption: 'for' | 'against' }>`
  display: grid;
  gap: 24px;

  .radio-group-option {
    align-items: center;
    grid-template: 'frame label';
    align-content: center;
    padding: 24px;
    
    &:first-child {
      border-color: ${({ theme, $selectedOption }) => $selectedOption === 'for'
        ? getVoteFormColor(theme, 'voteForBorderActive')
        : getVoteFormColor(theme, 'voteForBorder')
      };

      &:hover {
        border-color: ${({ theme }) => getVoteFormColor(theme, 'voteForBorderActive')};
      }

      .radio-frame,
      .radio-input:focus-visible ~ .radio-frame {
        border-color: ${({ theme }) => getVoteFormColor(theme, 'voteForFrame')};

        .radio-circle {
          background-color: ${({ theme }) => getVoteFormColor(theme, 'voteForFrame')};
        }
      }

      .radio-label {
        color: ${({ theme }) => getVoteFormColor(theme, 'voteForFrame')};
      }
    }

    &:last-child {
      border-color: ${({ theme, $selectedOption }) => $selectedOption === 'against'
        ? getVoteFormColor(theme, 'voteAgainstBorderActive')
        : getVoteFormColor(theme, 'voteAgainstBorder')
      };

      &:hover {
        border-color: ${({ theme }) => getVoteFormColor(theme, 'voteAgainstBorderActive')};
      }

      .radio-frame,
      .radio-input:focus-visible ~ .radio-frame {
        border-color: ${({ theme }) => getVoteFormColor(theme, 'voteAgainstFrame')};

        .radio-circle {
          background-color: ${({ theme }) => getVoteFormColor(theme, 'voteAgainstFrame')};
        }
      }

      .radio-label {
        color: ${({ theme }) => getVoteFormColor(theme, 'voteAgainstFrame')};
      }
    }
  }
`;
