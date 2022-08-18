import styled from 'styled-components';
import { media } from 'styles/media';

import { getTipColor } from './colors';
import { TipType } from '.';

export const TipWrapper = styled.div<{
  $type: TipType
  $compact?: boolean
}>`
  display: grid;
  grid-template: "icon text action" / auto 1fr auto;
  align-items: center;
  gap: ${({ $compact }) => $compact ? '8px' : '16px'};
  padding: ${({ $compact }) => $compact ? '12px 16px' : '16px'};
  border-radius: 8px;
  background-color: ${({ theme, $type }) => getTipColor(theme, `${$type}Bg`)};

  ${media.lessThan('tablet')} {
    grid-template: "icon text" "action action" / auto 1fr;
    column-gap: 8px;
    row-gap: 16px;
  }
  
  .tip-icon {
    grid-area: icon;
    color: ${({ theme, $type }) => getTipColor(theme, `${$type}Icon`)};
    align-self: center;
  }

  .tip-text {
    grid-area: text;
    color: ${({ theme, $type }) => $type === 'warning'
      ? getTipColor(theme, 'textWarning')
      : getTipColor(theme, 'text')
    };
    align-self: start;
  }

  .tip-action {
    grid-area: action;
    margin: -6px 0;

    ${media.lessThan('medium')} {
      margin: 0;
    }
  }
`;
