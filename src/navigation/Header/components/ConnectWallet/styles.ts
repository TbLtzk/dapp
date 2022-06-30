import styled from 'styled-components';

export const StyledConnectWalletModal = styled.div`
  .connect_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 20px;

    .header {
      display: flex;
      align-items: center;

      .mdi-wallet-outline {
        padding-right: 5px;
      }

      h5 {
        margin-bottom: 2px;
      }
    }
    .mdi-close {
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.colors.oxfordBlueTint3};
      }
    }
  }

  .connect_terms-of-service {
    display: flex;
    align-items: center;
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.oxfordBlueTint3};
    color: ${(props) => props.theme.colors.white};
    p {
      margin-bottom: 0;
      font-size: 13px;
      a {
        color: ${(props) => props.theme.colors.neonGreen};
      }
    }
  }

  .connect_new-to-q {
    margin-top: 20px;
    text-align: center;

    a {
      display: inline-block;
      cursor: pointer;
      color: ${(p) => p.theme.colors.oxfordBlueTint1};
      p {
        margin-bottom: 0;
      }
    }
  }

  .connect_buttons {
    button {
      margin-bottom: 10px;
    }
    .connect-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 23px;
        height: auto;
      }

      p {
        margin-left: 5px;
        margin-bottom: 0;
      }
    }
  }

  .install_metamask {
    text-align: center;
    margin-bottom: 10px;

    p {
      margin-bottom: 0;
    }
    a {
      color: ${(props) => props.theme.colors.oxfordBlue};
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
