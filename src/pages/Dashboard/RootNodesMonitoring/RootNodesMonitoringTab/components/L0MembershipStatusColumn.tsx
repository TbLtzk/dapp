
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { L0MembershipStatus } from 'typings/root-nodes';

interface Props {
  status: L0MembershipStatus;
}

const StyledWrapper = styled.p<{$status: L0MembershipStatus}>`
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
        case 'active':
          return theme.colors.successMain;
        case 'proposed':
          return theme.colors.warningSecondary;
        case 'not-in-list':
          return theme.colors.errorMain;
      }
    }};
  }
`;

function L0MembershipStatusColumn ({ status }: Props) {
  const { t } = useTranslation();

  const statusTextMap: Record<L0MembershipStatus, string> = {
    active: t('STATUS_ACTIVE'),
    proposed: t('STATUS_PROPOSED'),
    'not-in-list': t('STATUS_NOT_IN_LIST')
  };

  return (
    <StyledWrapper $status={status} className="font-semibold">
      {statusTextMap[status]}
    </StyledWrapper>
  );
}

export default L0MembershipStatusColumn;
