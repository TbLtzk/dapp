import styled from 'styled-components';

export const StyledNetwork = styled.div<{ networksLength: number; isQNetwork: boolean }>`
  width: ${(p) => (p.isQNetwork ? p.networksLength * 90 : 200)}px; // 90px for one
  height: 40px;
  background-color: ${(p) => p.theme.colors.oxfordBlueTint1};
  border-radius: 24px;
  display: flex;
  justify-content: space-around;
  cursor: pointer;

  .network-wrong {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 15px;
      margin-bottom: 0;
    }
  }

  .network-switch {
    width: 100%;
    position: relative;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .network-label {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      z-index: 10;
    }

    .active-network {
      transition: color 0.4s ease-in-out;
      color: ${(p) => p.theme.colors.oxfordBlue};
    }

    .network-background {
      position: absolute;
      background-color: ${(p) => p.theme.colors.oxfordBlueTint6};
      width: 85px;
      height: 36px;
      border-radius: 32px;
    }
  }
`;
