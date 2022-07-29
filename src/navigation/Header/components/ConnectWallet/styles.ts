import styled from 'styled-components';

export const StyledConnectWalletModal = styled.div`
  .connect_terms-of-service {
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .connect_new-to-q {
    margin-top: 24px;
    text-align: center;

    a {
      display: inline-block;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .connect_buttons {
    display: grid;
    gap: 8px;
   
    img {
      width: 23px;
      height: auto;
    }
  }

  .connect {
    width: 80%;
    margin: 0 auto 0 auto;
    text-align: center;
  }

  .connect-loading {
    text-align: center;
    height: 30px;
  }
`;
