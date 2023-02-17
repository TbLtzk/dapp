import styled from 'styled-components';

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
        ? theme.colors.primaryMain
        : theme.colors.primaryMiddle
      };

      &:hover {
        border-color: ${({ theme }) => theme.colors.primaryMain};
      }

      .radio-frame,
      .radio-input:focus-visible ~ .radio-frame {
        border-color: ${({ theme }) => theme.colors.primaryMain};

        .radio-circle {
          background-color: ${({ theme }) => theme.colors.primaryMain};
        }
      }

      .radio-input:focus-visible ~ .radio-frame::after {
        outline: 1px solid ${({ theme }) => theme.colors.primaryLight};
      }

      .radio-label {
        color: ${({ theme }) => theme.colors.primaryMain};
      }
    }

    &:last-child {
      border-color: ${({ theme, $selectedOption }) => $selectedOption === 'against'
        ? theme.colors.errorMain
        : theme.colors.errorPrimary
      };

      &:hover {
        border-color: ${({ theme }) => theme.colors.errorMain};
      }

      .radio-frame,
      .radio-input:focus-visible ~ .radio-frame {
        border-color: ${({ theme }) => theme.colors.errorMain};

        .radio-circle {
          background-color: ${({ theme }) => theme.colors.errorMain};
        }
      }

      .radio-input:focus-visible ~ .radio-frame::after {
        outline: 1px solid ${({ theme }) => theme.colors.errorSecondary};
      }

      .radio-label {
        color: ${({ theme }) => theme.colors.errorMain};
      }
    }
  }
`;
