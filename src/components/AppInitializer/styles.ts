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
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;


  .breathing-qgov {
    width: 100px;
    height: 100px;
  }
  
  .breathing-qgov__logo {
    width: 100%;
    height: auto;
  }
`;
