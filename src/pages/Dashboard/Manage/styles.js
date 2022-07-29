import styled from 'styled-components';
import { media } from 'styles/media';

export const ParametersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  align-items: start;

  ${media.lessThan('large')} {
    grid-template-columns: minmax(100px, 1fr);
  }

  & > div {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
`;
