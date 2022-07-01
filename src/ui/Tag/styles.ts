
import styled from 'styled-components';

import { getTagColor } from './colors';
import { TagState } from '.';

export const TagContainer = styled.p<{ $state: TagState }>`
  padding: 4px 12px;
  border-radius: 32px;
  display: grid;
  place-content: center;
  background-color: ${({ theme, $state }) => getTagColor(theme, $state)};
  color: ${({ theme }) => getTagColor(theme, 'text')};
`;
