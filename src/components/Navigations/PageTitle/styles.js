import styled from 'styled-components';

import { indents } from 'constants/style';

export const PageTitleWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${indents['15']};
  padding-top: ${indents['15']};

  a {
    text-decoration: none;
  }
`;

export const PageTitleName = styled.div`
  max-width: 50%;
  display: flex;
  font-size: 30px;
  line-height: 38px;
  overflow: hidden;
  align-items: flex-start;
  font-family: "Lora", sans-serif;
  text-transform: capitalize;
`;

export const PageTitleActions = styled.div`
  display: flex;
  align-items: flex-end;
`;
