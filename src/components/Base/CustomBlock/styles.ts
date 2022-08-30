import styled from 'styled-components';

export const Block = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.block};
  border: 1px solid ${({ theme }) => theme.colors.blockBorder};
  border-radius: 16px;
  padding: 24px 32px;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.blockShadow};
  height: fit-content;
  position: relative;

  h1 {
    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 20px;
    line-height: 35px;
    margin-bottom: 15px;
    font-family: 'Lora', sans-serif;
  }

  h5 {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 13px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 2px;
  }

  p {
    font-size: 13px;
    margin-bottom: 15px;
  }
`;
