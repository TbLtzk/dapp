import styled from 'styled-components';

export const PolicyContainer = styled.div`
  width: 50%;

  h3 {
    padding-left: 10px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }

  h5 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  a {
    color: ${(p) => p.theme.colors.neonGreen};
  }

  ul {
    font-size: 13px;
  }
  @media screen and (max-width: 1250px) {
    width: 100%;
  }
`;
