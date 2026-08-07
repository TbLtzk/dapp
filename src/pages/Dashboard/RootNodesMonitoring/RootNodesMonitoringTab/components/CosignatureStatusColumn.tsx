
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { CosignatureStatus } from 'typings/root-nodes';

import { getCosignatureStatusColor } from '../helpers/cosignature-status-colors';

interface Props {
  status: CosignatureStatus;
}

const StyledWrapper = styled.div<{$status: CosignatureStatus}>`
  display: flex;
  align-items: center;
  gap: 5px;

  .cosignature-status-column__label {
    color: ${({ theme, $status }) => getCosignatureStatusColor(theme, $status)};
    font-weight: 600;
  }
`;

function CosignatureStatusColumn ({ status }: Props) {
  const { t } = useTranslation();

  const statusTextMap: Record<CosignatureStatus, string> = {
    online: t('ONLINE'),
    offline: t('OFFLINE'),
    'waiting-approval': t('WAITING_FOR_APPROVAL'),
    'not-in-list': t('STATUS_NOT_IN_LIST'),
  };

  const descriptionMap: Record<CosignatureStatus, string> = {
    online: t('COSIGNATURE_STATUS_ONLINE_DESC'),
    offline: t('COSIGNATURE_STATUS_OFFLINE_DESC'),
    'waiting-approval': t('COSIGNATURE_STATUS_WAITING_DESC'),
    'not-in-list': t('ADDRESS_IS_NOT_ON_ACTIVE_LIST'),
  };

  return (
    <StyledWrapper $status={status}>
      <span className="cosignature-status-column__label">
        {statusTextMap[status]}
      </span>
      <Tooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
        <div className="root-node-metric-tooltip__content">
          <h4 className="text-md font-semibold">
            {t('CO_SIGNATURE_STATUS')}
          </h4>
          <span>
            {descriptionMap[status]}
          </span>
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

export default CosignatureStatusColumn;
