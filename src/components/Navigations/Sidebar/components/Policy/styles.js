import styled from 'styled-components';

export const PolicyContainer = styled.div`

h3 {
    color: ${(props) => props.theme.colors.oxfordBlue};
    padding-left: 10px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;

  }

  h5 {
    margin-top: 10px;
    color: ${(props) => props.theme.colors.oxfordBlue};
    margin-bottom: 10px;
  }

  a {
    color: ${(props) => props.theme.colors.oxfordBlue};
  }

  ul {
    font-size: 13px;
  }
`;
