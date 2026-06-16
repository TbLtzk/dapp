import { DefaultTheme } from 'styled-components';

import { CosignatureStatus } from 'typings/root-nodes';

export function getCosignatureStatusColor (
  theme: DefaultTheme,
  status: CosignatureStatus,
): string {
  switch (status) {
    case 'online':
      return theme.colors.successMain;
    case 'waiting-approval':
      return theme.colors.warningSecondary;
    case 'offline':
      return theme.colors.errorMain;
    case 'not-in-list':
      return theme.colors.textAdditional;
  }
}
