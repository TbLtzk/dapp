
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { L0ApprovalStatus } from 'typings/root-nodes';

interface Props {
  status: L0ApprovalStatus;
  tooltipHeader: string;
  unsignedListsItems: string[];
}

const StyledWrapper = styled.div<{$status: L0ApprovalStatus}>`
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    display: inline-block;
    content: '';
    border-radius: 50%;
    height: 8px;
    width: 8px;
    margin-right: 4px;
    background-color: ${({ theme, $status }) => {
      switch ($status) {
        case 'all-signed':
          return theme.colors.successMain;
        case 'not-signed':
          return theme.colors.warningSecondary;
        case 'not-in-list':
          return theme.colors.errorMain;
      }
    }};
  }

  .l0-approval-status-column__not-signed-list {
    list-style-position: inside;
    list-style-type: disc;
  }
`;

function L0ApprovalStatusColumn ({ tooltipHeader, unsignedListsItems, status }: Props) {
  const { t } = useTranslation();

  const statusTextMap: Record<L0ApprovalStatus, string> = {
    'all-signed': t('STATUS_ALL_SIGNED'),
    'not-signed': t('STATUS_NOT_SIGNED'),
    'not-in-list': t('STATUS_NOT_IN_LIST')
  };

  const descriptionMap: Record<L0ApprovalStatus, string> = {
    'all-signed': t('ALL_LISTS_ARE_SIGNED'),
    'not-signed': t('DID_NOT_SIGN'),
    'not-in-list': t('ADDRESS_IS_NOT_ON_ACTIVE_LIST')
  };

  return (
    <StyledWrapper $status={status}>
      <span>
        {statusTextMap[status]}
      </span>
      <Tooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
        <div className="root-node-metric-tooltip__content">
          <h4 className="text-md font-semibold">
            {tooltipHeader}
          </h4>
          <span>
            {descriptionMap[status]}
          </span>
          {status === 'not-signed' && unsignedListsItems.length && (
            <ul className="l0-approval-status-column__not-signed-list">
              {unsignedListsItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

export default L0ApprovalStatusColumn;
