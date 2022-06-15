import styled from 'styled-components';

import Switch from 'components/Base/Form/Switch';

import { indents } from 'constants/style';

export const ParametersWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: ${indents['15']};
  padding-right: 12px;

  @media screen and (max-width: 1420px) {
    display: grid;
    grid-template-columns: minmax(100px, 1fr);
    padding-right: 0;
  }
`;

export const ParametersSwitch = styled(Switch)`
  margin-right: 20px;
`;
