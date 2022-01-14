import styled from "styled-components";

export const NetworkWrapper = styled.div`
  display: flex;
  .network__current {
    color: ${(props) => props.theme.colors.neonGreen};
  }
`;
