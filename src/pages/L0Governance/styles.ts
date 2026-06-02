import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: grid;
  gap: 16px;

  .l0-governance__hero {
    padding: 24px;
    display: grid;
    gap: 16px;

    ${media.lessThan('medium')} {
      padding: 16px;
    }
  }

  .l0-governance__eyebrow {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .l0-governance__description {
    max-width: 720px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .l0-governance__eligibility {
    padding: 16px;
    display: grid;
    gap: 8px;
    border: 1px solid ${({ theme }) => theme.colors.borderMain};
  }

  .l0-governance__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .l0-governance__cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    ${media.lessThan('medium')} {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .l0-governance__card {
    padding: 20px;
    display: grid;
    gap: 12px;
  }
`;
