import styled from 'styled-components'

import {Row} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapDescr = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-transform: lowercase;
  color: ${colors.lightGrey};
`;
export const WrapTabs = styled(Row)`
  padding-top: ${indents[40]};
`;
