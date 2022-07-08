import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;


  .breathing-q {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: auto;
      filter: ${({ theme }) => theme.palette === 'dark' ? 'brightness(100)' : 'none'};
    }
  }
`;

export const Shadow = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 54%);
`;

export const WrapLoading = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #ffffff;
  }
`;
