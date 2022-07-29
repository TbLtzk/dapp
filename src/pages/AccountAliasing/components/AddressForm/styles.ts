import styled from 'styled-components';
import { media } from 'styles/media';

export const WrapContainer = styled.div`
  margin-top: 10px;
  display: grid;
  align-items: flex-start;
  width: 100%;
  grid-template-columns: 480px max-content;
  gap: 15px;

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;

    button {
      width: max-content;
    }
  }
`;
