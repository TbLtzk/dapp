import styled from 'styled-components';

export const SettingsContainer = styled.div`
  position: relative;

  .popup_container {
    min-width: 277px;
    background-color: ${(props) => props.theme.colors.oxfordBlue};
    box-shadow: 0px 4px 4px rgba(7, 23, 43, 0.32), 0px -1px 2px rgba(7, 23, 43, 0.24);
    border-radius: 8px;
    padding-bottom: 10px;
  }

  .popup_title {
    padding: 10px 15px 10px 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .mdi:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.neonGreen};
      transform: scale(1.1);
    }
    h6 {
      margin-bottom: 0;
    }
  }

  .popup_menu {
    padding: 10px 0 0 0;
    & > div {
      cursor: pointer;
      padding: 10px 15px 10px 15px;

      &:hover {
        background-color: ${(props) => props.theme.colors.oxfordBlueTint1};
      }
    }
  }

  .language_container {
    display: flex;
    justify-content: space-between;
  }

  .language {
    display: flex;
    align-items: center;
    div {
      width: 20px;
    }
    h6 {
      padding-top: 3px;
      margin-bottom: 0;
      margin-left: 2px;
    }
  }
`;
