import styled, { css } from 'styled-components';

export const ToggleContaier = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .toggle-label {
    cursor: pointer;
    margin-bottom: 4px;
  }

  .toggle-background {
    position: relative;
    height: 32px;
    width: 52px;
    background-color: transparent;
    border-radius: 38px;
    border: 2px solid ${(props) => props.theme.colors.oxfordBlueTint6};

    .toggle-circle {
      position: absolute;
      border-radius: 100%;
      background-color: ${(props) => props.theme.colors.oxfordBlueTint6};
      ${(p) =>
        p.checked
          ? css`
              height: 16px;
              width: 16px;
              top: 6px;
              left: 4px;
            `
          : css`
              height: 24px;
              width: 24px;
              top: 2px;
              left: 22px;
            `}
    }
  }
`;
