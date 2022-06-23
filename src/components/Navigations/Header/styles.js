import styled, { css } from 'styled-components';

const handleColorTheme = (props) => {
  switch (props.network) {
    case '35441': {
      return css`
        color: ${props.theme.colors.oxfordBlue};
        background: ${props.theme.colors.neonGreen};
      `;
    }
    case '35442': {
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.red};
      `;
    }
    case '35443': {
      return css`
        color: ${props.theme.colors.oxfordBlue};
        background: ${props.theme.colors.validationError};
      `;
    }
    case '35444': {
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.red};
      `;
    }
    case 'unknown':
    default: {
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.oxfordBlueTint2};
      `;
    }
  }
};

export const ElementsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 60px 0 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
  height: 70px;

  @media screen and (max-width: 1550px) {
    padding: 0 30px 0 20px;
  }
`;

export const WrapLogo = styled.div`
  img {
    width: 53px;
  }
`;

export const NetworkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  border-radius: 3px;
  width: 150px;
  text-transform: capitalize;
  ${(props) => handleColorTheme(props)}
`;
