import styled from 'styled-components';
import { media } from 'styles/media';

export const WrapContainer = styled.div`
  margin-top: 10px;
  display: grid;
  align-items: flex-start;
  width: 100%;
  grid-template-columns: minmax(380px, 480px) max-content;
  gap: 16px;
  
  .address-form-button {
    margin-top: 33px;
  }

  ${media.lessThan('tablet')} {
    grid-template-columns: 1fr;
    
    .address-form-button {
      width: max-content;
      margin-top: 0;
    }
  }
`;
