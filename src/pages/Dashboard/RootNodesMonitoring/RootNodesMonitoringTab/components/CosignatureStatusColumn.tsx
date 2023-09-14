
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { CosignatureStatus } from 'typings/root-nodes';

interface Props {
  status: CosignatureStatus;
}

const StyledWrapper = styled.p<{$status: CosignatureStatus}>`
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'online':
        return theme.colors.successMain;
      case 'waiting-approval':
        return theme.colors.warningSecondary;
      case 'offline':
        return theme.colors.textAdditional;
    }
  }};
`;

function CosignatureStatusColumn ({ status }: Props) {
  const { t } = useTranslation();

  const statusTextMap: Record<CosignatureStatus, string> = {
    online: t('ONLINE'),
    offline: t('OFFLINE'),
    'waiting-approval': t('WAITING_FOR_APPROVAL')
  };

  return (
    <StyledWrapper $status={status} className="font-semibold">
      {statusTextMap[status]}
    </StyledWrapper>
  );
}

export default CosignatureStatusColumn;
